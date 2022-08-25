import cn from 'classnames';

import style from './style.scss';
import Container from '../Container';

const Banner = ({ className, image, title, action }) => {
	return (
		<div className={cn(className, style.container)} style={{ backgroundImage: `url("${image}")` }}>
			<Container className={style.wrapper}>
				<h2 className={style.title}>
					{title}
				</h2>
				{action}
			</Container>
		</div>
	);
};

export default Banner;
