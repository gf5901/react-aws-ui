import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { push } from 'connected-react-router';
import { SELECTOR_KEY_APP, setDarkModeAction } from '@local/modules/app';
import { StoreState } from '@local/store/index';
import { LocalLink } from '@local/shared/LocalLink/LocalLink';
import './SideNavigation.scss';

interface Props {
	loading: boolean;
}

interface LinkSection {
	name: string;
	links: Link[];
}

interface Link {
	name: string;
	path?: string;
	onClick?(): void;
	iconUrl: string;
}

export const SideNavigation: React.FC<Props> = ({ loading }) => {
	const { darkMode } = useSelector((state: StoreState) => state[SELECTOR_KEY_APP]);

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('dark-mode');
		} else {
			document.body.classList.remove('dark-mode');
		}
	}, [darkMode]);

	const toggleDarkMode = () => {
		if (localStorage) {
			localStorage.setItem('dm', !darkMode ? 'true' : 'false');
		}
		dispatch(setDarkModeAction(!darkMode));
	}
	if (loading) {
		return <></>;
	}
	const LINKS: LinkSection[] = [{
		name: 'Storage',
		links: [{
			name: 'S3',
			path: '/s3',
			iconUrl: '/img/logos_aws-s3.svg'
		}]
	}, {
		name: 'Compute',
		links: [{
			name: 'Lambda',
			path: '/lambda',
			iconUrl: '/img/logos_aws-lambda.svg'
		}]
	}, {
		name: 'Database',
		links: [{
			name: 'DynamoDB',
			path: '/dynamodb',
			iconUrl: '/img/logos_aws-dynamodb.svg'
		}]
	}, {
		name: 'Network',
		links: [{
			name: 'Route53',
			path: '/route53',
			iconUrl: '/img/logos_aws-route53.svg'
		}, {
			name: 'CloudFront',
			path: '/cloudfront',
			iconUrl: '/img/logos_aws-cloudfront.svg'
		}, {
			name: 'API Gateway',
			path: '/apigateway',
			iconUrl: '/img/logos_aws-api-gateway.svg'
		}]
	}, {
		name: 'Settings',
		links: [{
			name: !darkMode ? 'Dark Mode' : 'Light Mode',
			iconUrl: !darkMode ? '/img/DarkModeIcon.svg' : '/img/LightModeIcon.svg',
			onClick: () => toggleDarkMode(),
		}]
	}, {
		name: 'Help',
		links: [{
			name: 'Contact',
			path: '/contact',
			iconUrl: '/img/ChatIcon.svg',
		}]
	}]
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const onNavigate = React.useCallback((path: string) => {
		dispatch(push(path));
	}, [])
	return (
		<nav className="side-navigation">
			<header>
				<img src="/img/logos_aws.svg" alt="logo" />
				<span>React UI</span>
			</header>
			<ul>
				{LINKS.map((linkSection) => (
					<li key={linkSection.name}>
						<header>{linkSection.name}</header>
						<ul>
							{linkSection.links.map((link) => (
								<li key={link.name} onClick={() => onNavigate(link.path)} className={(pathname.startsWith(link.path)) ? 'selected' : ''}>
									<LocalLink path={link.path}><SvgInline url={link.iconUrl} /><span>{link.name}</span></LocalLink>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</nav>
	);
};

interface SvgInlineProps {
	url: string;
}

const SvgInline: React.FC<SvgInlineProps> = ({ url }) => {
	const [svg, setSvg] = useState<string>('');
	const [isLoaded, setIsLoaded] = useState(false);
	const [isErrored, setIsErrored] = useState(false);

	useEffect(() => {
		fetch(url)
			.then(res => res.text())
			.then(setSvg)
			.catch(setIsErrored)
			.then(() => setIsLoaded(true))
	}, [url]);

	return (
		<div
			className={`svgInline svgInline--${isLoaded ? 'loaded' : 'loading'} ${isErrored ? 'svgInline--errored' : ''}`}
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}