import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;

	margin-top: 50px;
`;

export const Repository = styled.div`
	width: 250px;
	background: #fff;
	border-radius: 3px;
	margin: 0 10px;

	display: flex;
	flex-direction: column;

	header {
		padding: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;

		img {
			width: 64px;
		}

		strong {
			font-size: 24px;
			margin-top: 10px;
		}

		small {
			font-size: 14px;
			color: #666;
		}

		section {
			margin-top: 10px;

			button {
				background: #9b65e6;
				padding: 5px;
				color: #fff;
				border-radius: 5px;
				border: 0;
				margin: 0 5px;
				min-width: 30px;
				&:hover {
					background: #8448d6;
					cursor: pointer;
				}
			}
		}
	}

	ul {
		list-style: none;

		li {
			font-weight: bold;
			padding: 12px 20px;

			small {
				font-weight: normal;
				font-size: 12px;
				color: #999;
				font-style: italic;
			}

			&:nth-child(2n-1) {
				background: #f5f5f5;
			}
		}
	}
`;
