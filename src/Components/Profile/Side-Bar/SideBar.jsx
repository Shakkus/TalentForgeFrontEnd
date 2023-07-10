import { Link } from "react-router-dom";

// ESTILOS
import styles from "./SideBar.module.css";

// IMAGENES
import carpincho from "../../../Recourses/CarpinchoLogo.png";
import perfil from "../../../Recourses/profile.png";

const sideBar = () => {
	return (
		<div className={styles.mainContainer}>
			<div className={styles.sideBar}>
				{/* LOGO TALENT FORGE */}
				<Link to="/presentation">
					<img src={carpincho} alt="" className={styles.logo} />
				</Link>

				{/* ICONO HOME */}
				<Link to="/presentation">
					<svg
						className={styles.button}
						xmlns="http://www.w3.org/2000/svg"
						width="68"
						height="60"
						viewBox="0 0 68 60"
						fill="none"
					>
						<g clipPath="url(#clip0_32_799)">
							<path
								d="M67.9764 29.9414C67.9764 32.0508 66.2056 33.7031 64.1986 33.7031H60.4208L60.5035 52.4766C60.5035 52.793 60.4799 53.1094 60.4444 53.4258V55.3125C60.4444 57.9023 58.3313 60 55.7222 60H53.8333C53.7035 60 53.5736 60 53.4438 59.9883C53.2785 60 53.1132 60 52.9479 60H49.1111H46.2778C43.6688 60 41.5556 57.9023 41.5556 55.3125V52.5V45C41.5556 42.9258 39.8674 41.25 37.7778 41.25H30.2222C28.1326 41.25 26.4444 42.9258 26.4444 45V52.5V55.3125C26.4444 57.9023 24.3313 60 21.7222 60H18.8889H15.1229C14.9458 60 14.7688 59.9883 14.5917 59.9766C14.45 59.9883 14.3083 60 14.1667 60H12.2778C9.66875 60 7.55556 57.9023 7.55556 55.3125V42.1875C7.55556 42.082 7.55556 41.9648 7.56736 41.8594V33.7031H3.77778C1.65278 33.7031 0 32.0625 0 29.9414C0 28.8867 0.354167 27.9492 1.18056 27.1289L31.45 0.9375C32.2764 0.117188 33.2208 0 34.0472 0C34.8736 0 35.8181 0.234375 36.5264 0.820312L66.6778 27.1289C67.6222 27.9492 68.0944 28.8867 67.9764 29.9414Z"
								fill="white"
							/>
						</g>
						<defs>
							<clipPath id="clip0_32_799">
								<rect width="68" height="60" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</Link>

				<br />
				{/* ICONO CURSOS */}
				<Link to="/courses">
					<svg
						className={styles.button}
						xmlns="http://www.w3.org/2000/svg"
						width="51"
						height="51"
						viewBox="0 0 51 51"
						fill="none"
					>
						<path
							d="M18.3281 4.78125H32.6719C33.1102 4.78125 33.4688 5.13984 33.4688 5.57812V9.5625H17.5312V5.57812C17.5312 5.13984 17.8898 4.78125 18.3281 4.78125ZM12.75 5.57812V9.5625H6.375C2.85879 9.5625 0 12.4213 0 15.9375V25.5H19.125H31.875H51V15.9375C51 12.4213 48.1412 9.5625 44.625 9.5625H38.25V5.57812C38.25 2.5002 35.7498 0 32.6719 0H18.3281C15.2502 0 12.75 2.5002 12.75 5.57812ZM51 28.6875H31.875V31.875C31.875 33.6381 30.4506 35.0625 28.6875 35.0625H22.3125C20.5494 35.0625 19.125 33.6381 19.125 31.875V28.6875H0V41.4375C0 44.9537 2.85879 47.8125 6.375 47.8125H44.625C48.1412 47.8125 51 44.9537 51 41.4375V28.6875Z"
							fill="white"
						/>
					</svg>
				</Link>
				<br />
				{/* ICONO FAVORITOS */}
				<Link to="/favorites">
					<svg
						className={styles.button}
						xmlns="http://www.w3.org/2000/svg"
						width="51"
						height="51"
						viewBox="0 0 51 51"
						fill="none"
					>
						<path
							d="M22.4918 46.6371L22.2428 46.408L4.79121 30.2015C1.7332 27.3626 0 23.3783 0 19.2046V18.8759C0 11.8634 4.98047 5.84701 11.8734 4.53217C15.798 3.77514 19.8123 4.68158 23.0098 6.93275C23.9062 7.57025 24.743 8.30736 25.5 9.15404C25.9184 8.67592 26.3666 8.23764 26.8447 7.82924C27.2133 7.51049 27.5918 7.21166 27.9902 6.93275C31.1877 4.68158 35.202 3.77514 39.1266 4.52221C46.0195 5.83705 51 11.8634 51 18.8759V19.2046C51 23.3783 49.2668 27.3626 46.2088 30.2015L28.7572 46.408L28.5082 46.6371C27.6914 47.3941 26.6156 47.8224 25.5 47.8224C24.3844 47.8224 23.3086 47.404 22.4918 46.6371ZM23.8166 14.4433C23.7768 14.4134 23.7469 14.3736 23.717 14.3337L21.9439 12.3415L21.934 12.3316C19.633 9.7517 16.1566 8.57631 12.7699 9.22377C8.12813 10.1103 4.78125 14.1544 4.78125 18.8759V19.2046C4.78125 22.0435 5.9666 24.7628 8.04844 26.6953L25.5 42.9017L42.9516 26.6953C45.0334 24.7628 46.2188 22.0435 46.2188 19.2046V18.8759C46.2188 14.1644 42.8719 10.1103 38.24 9.22377C34.8533 8.57631 31.367 9.76166 29.076 12.3316C29.076 12.3316 29.076 12.3316 29.066 12.3415C29.0561 12.3515 29.066 12.3415 29.0561 12.3515L27.283 14.3437C27.2531 14.3835 27.2133 14.4134 27.1834 14.4533C26.7352 14.9015 26.1275 15.1505 25.5 15.1505C24.8725 15.1505 24.2648 14.9015 23.8166 14.4533V14.4433Z"
							fill="white"
						/>
					</svg>
				</Link>
				<br />
				{/* ICONO CHATS */}
				<Link to="/chats">
					<svg
						className={styles.button}
						xmlns="http://www.w3.org/2000/svg"
						width="69"
						height="51"
						viewBox="0 0 69 51"
						fill="none"
					>
						<g clipPath="url(#clip0_32_795)">
							<path
								d="M9.50899 30.7893C10.5656 28.9664 10.2421 26.7252 8.7004 25.2311C6.40399 22.9998 5.17493 20.3203 5.17493 17.5312C5.17493 11.2061 12.0534 4.78125 22.4249 4.78125C32.7965 4.78125 39.6749 11.2061 39.6749 17.5312C39.6749 23.8564 32.7965 30.2812 22.4249 30.2812C21.0126 30.2812 19.6434 30.1518 18.3496 29.9227C17.2284 29.7234 16.064 29.8629 15.0398 30.341C14.5977 30.5502 14.1449 30.7494 13.6813 30.9387C11.9563 31.6559 10.1343 32.2834 8.30149 32.7316C8.60337 32.2734 8.88368 31.8252 9.15321 31.377C9.2718 31.1877 9.3904 30.9885 9.49821 30.7893H9.50899ZM-7.08278e-05 17.5312C-7.08278e-05 21.6949 1.8543 25.51 4.94852 28.5182C4.85149 28.6875 4.74368 28.8668 4.64665 29.0262C3.53618 30.859 2.24243 32.6619 0.70071 34.2158C-0.0108521 34.9131 -0.194133 35.9291 0.204773 36.7957C0.625242 37.6822 1.55243 38.25 2.58743 38.25C7.22337 38.25 11.9132 36.9252 15.816 35.2916C16.3335 35.0725 16.851 34.8434 17.347 34.6143C18.9749 34.9131 20.6784 35.0625 22.4249 35.0625C34.8126 35.0625 44.8499 27.2133 44.8499 17.5312C44.8499 7.84922 34.8126 0 22.4249 0C10.0373 0 -7.08278e-05 7.84922 -7.08278e-05 17.5312ZM46.5749 47.8125C48.3215 47.8125 50.0141 47.6531 51.6529 47.3643C52.1488 47.5934 52.6663 47.8225 53.1838 48.0416C57.0866 49.6752 61.7765 51 66.4124 51C67.4474 51 68.3746 50.4322 68.7843 49.5557C69.194 48.6791 68.9999 47.6631 68.2884 46.9758C66.7574 45.4219 65.4637 43.6189 64.3424 41.7861C64.2454 41.6168 64.1376 41.4475 64.0406 41.2781C67.1455 38.26 68.9999 34.4449 68.9999 30.2812C68.9999 20.8781 59.5232 13.1982 47.6315 12.7699C48.0735 14.284 48.2999 15.8777 48.2999 17.5312V17.591C57.7012 18.2584 63.8249 24.3146 63.8249 30.2812C63.8249 33.0703 62.5959 35.7498 60.2995 37.9711C58.7577 39.4652 58.4343 41.7164 59.4909 43.5293C59.6095 43.7285 59.7281 43.9277 59.8359 44.117C60.1054 44.5652 60.3965 45.0135 60.6876 45.4717C58.8548 45.0234 57.0327 44.4059 55.3077 43.6787C54.8441 43.4895 54.3913 43.2902 53.9493 43.0811C52.9251 42.6029 51.7607 42.4635 50.6395 42.6627C49.3349 42.9018 47.9765 43.0213 46.5641 43.0213C39.9121 43.0213 34.7048 40.3816 31.8154 36.8156C30.0904 37.3535 28.2791 37.752 26.4248 37.991C30.0796 43.8082 37.7343 47.8125 46.5749 47.8125Z"
								fill="white"
							/>
						</g>
						<defs>
							<clipPath id="clip0_32_795">
								<rect width="69" height="51" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</Link>
				<br />
				{/* ICONO NOTICIAS */}
				<Link to="/news">
					<svg
						className={styles.button}
						xmlns="http://www.w3.org/2000/svg"
						width="51"
						height="51"
						viewBox="0 0 51 51"
						fill="none"
					>
						<path
							d="M16.7344 7.96875C15.4096 7.96875 14.3438 9.03457 14.3438 10.3594V40.6406C14.3438 41.4773 14.2043 42.2842 13.9354 43.0312H43.8281C45.1529 43.0312 46.2188 41.9654 46.2188 40.6406V10.3594C46.2188 9.03457 45.1529 7.96875 43.8281 7.96875H16.7344ZM7.17188 47.8125C3.20742 47.8125 0 44.6051 0 40.6406V11.1562C0 9.83145 1.06582 8.76562 2.39062 8.76562C3.71543 8.76562 4.78125 9.83145 4.78125 11.1562V40.6406C4.78125 41.9654 5.84707 43.0312 7.17188 43.0312C8.49668 43.0312 9.5625 41.9654 9.5625 40.6406V10.3594C9.5625 6.39492 12.7699 3.1875 16.7344 3.1875H43.8281C47.7926 3.1875 51 6.39492 51 10.3594V40.6406C51 44.6051 47.7926 47.8125 43.8281 47.8125H7.17188ZM17.5312 13.5469C17.5312 12.2221 18.5971 11.1562 19.9219 11.1562H29.4844C30.8092 11.1562 31.875 12.2221 31.875 13.5469V21.5156C31.875 22.8404 30.8092 23.9062 29.4844 23.9062H19.9219C18.5971 23.9062 17.5312 22.8404 17.5312 21.5156V13.5469ZM37.4531 11.1562H40.6406C41.9654 11.1562 43.0312 12.2221 43.0312 13.5469C43.0312 14.8717 41.9654 15.9375 40.6406 15.9375H37.4531C36.1283 15.9375 35.0625 14.8717 35.0625 13.5469C35.0625 12.2221 36.1283 11.1562 37.4531 11.1562ZM37.4531 19.125H40.6406C41.9654 19.125 43.0312 20.1908 43.0312 21.5156C43.0312 22.8404 41.9654 23.9062 40.6406 23.9062H37.4531C36.1283 23.9062 35.0625 22.8404 35.0625 21.5156C35.0625 20.1908 36.1283 19.125 37.4531 19.125ZM19.9219 27.0938H40.6406C41.9654 27.0938 43.0312 28.1596 43.0312 29.4844C43.0312 30.8092 41.9654 31.875 40.6406 31.875H19.9219C18.5971 31.875 17.5312 30.8092 17.5312 29.4844C17.5312 28.1596 18.5971 27.0938 19.9219 27.0938ZM19.9219 35.0625H40.6406C41.9654 35.0625 43.0312 36.1283 43.0312 37.4531C43.0312 38.7779 41.9654 39.8438 40.6406 39.8438H19.9219C18.5971 39.8438 17.5312 38.7779 17.5312 37.4531C17.5312 36.1283 18.5971 35.0625 19.9219 35.0625Z"
							fill="white"
						/>
					</svg>
				</Link>
				<br />

				{/* PERFIL */}
				<Link to='/profile/edit'>
				<img src={perfil} alt="" className={styles.profile} />
				
				</Link>
			</div>
		</div>
	);
};

export default sideBar;
