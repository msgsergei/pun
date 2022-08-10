import { Link } from 'preact-router';
import { Text } from 'preact-i18n'
import cn from 'classnames'
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io'

import style from './style.scss';
import IconCell from './IconCell';
import DataCell from './DataCell';
import Container from '../Container';
import { useLanguage } from '../../tools/language';
import { formatDate } from '../../tools/dates';

const approximateNumber = n => (
	parseFloat(n)
	? '>' + (Math.floor(parseFloat(n) / 1e3) * 1e3).toLocaleString()
	: n
)

const Dashboard = (props) => {
	// console.log('Dashboard', props)
	const language = useLanguage();

	const formatter = formatDate(language);

	let { from, till, prev, next, data } = props
	from = formatter(from);
	till = formatter(till);

	return (
		<Container>
			<h1 className={style.heading}>
				<Text id="report.title" fields={{ from, till }}>
					Weapons committed to Ukraine
				</Text>
				<div className={style.subHeading}>
					<div className={style.subtitle}>
						<Text id="report.subtitle" fields={{ from, till }}>
							as of {till}
						</Text>
					</div>
					<div className={style.nav}>
						<Link
							className={style.navLink}
							{...prev && { href: `/${language}/report/${prev}` }}
						>
							{'← '}
						</Link>
						<Text id="report.timespan">2 weeks</Text>
						<Link
							className={style.navLink}
							{...next && { href: `/${language}/report/${next}` }}
						>
							{' →'}
						</Link>
					</div>
				</div>
			</h1>
			<div className={style.table}>
				<div className={style.head} />
				<div className={style.head}>
					<Text id="report.usa">USA</Text>
				</div>
				<div className={style.head}>
					<Text id="report.rest">Others</Text>
				</div>
				<div className={cn(style.head, style.russia)}>
					<Text id="report.russia">Russia had</Text>
				</div>

				{data.map(({ category, values: [usa, rest, russia] }) => (
					<div className={style.row}>
						<IconCell category={category} />
						<DataCell className={style.valueCell} {...usa} key={`${category}-USA`} />
						<DataCell className={style.valueCell} {...rest} key={`${category}-rest`} />
						<DataCell className={cn(style.valueCell, style.russia)} {...{ value: approximateNumber(russia.value) }} key={`${category}-russia`} />
					</div>
				))}
			</div>
		</Container>
	)
}

export default Dashboard;
