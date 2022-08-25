import cn from 'classnames';
import { Match, Link } from 'preact-router/match';

import style from './style.scss';
import { useUrl } from '../../tools/url';
import { useLanguage } from '../../tools/language';

export default function Menu({ className, linkClassName, activeClassName, items, onClick, theme = 'dark' }) {
	let url = useUrl();
	let language = useLanguage();
	// console.log('Menu', { url, language })
	return (
		<Match>
			{({ url }) => {
				let language = url.split('/')[1];
				return (
					<div className={cn(style.container, className, style[theme])}>
						{items(language).map(([name, href]) =>
							<Match path={href}>
								{({ matches }) => (matches ?
									<span
										className={cn(style.link, linkClassName, style.active, activeClassName)}><span>{name}</span></span> :
									<Link onClick={onClick} {...{ href, key: href }} className={cn(style.link, linkClassName)}
												activeClassName={cn(style.active, activeClassName)}>
										<span>
											{name}
										</span>
									</Link>)}
							</Match>
						)}
					</div>
				);
			}}
		</Match>
	);
}
