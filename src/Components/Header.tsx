"use client";

import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useClickOutside } from "../hooks/useClickOutsideMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerMenu } from "../Utils";

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const pathname = usePathname();

	const onClickOutsideMenu = () => {
		setIsOpen(false);
	};

	const ref = useRef<any>();

	useClickOutside(ref, onClickOutsideMenu);

	const toggleDropdown = () => setIsOpen(!isOpen);

	return (
		<WrapperHeader>
			<Link href={"/"}>
				<HeaderLogo open={isMenuOpen}>Logo Here</HeaderLogo>
			</Link>
			<HeaderContent open={isMenuOpen}>
				<nav>
					<HeaderMenu>
						{headerMenu.map((headerItem, i) => {
							if (Array.isArray(headerItem)) {
								return (
									<li key={i}>
										<DropdowmMenuContainer
											open={isMenuOpen}
											openmenu={isOpen ? "open" : "notOpen"}
											ref={ref}
										>
											<div
												style={
													pathname.includes("features") ? { color: "#000", fontWeight: 600 } : {}
												}
												onClick={toggleDropdown}
											>
												Features
											</div>
											{isOpen && (
												<ul>
													{headerItem.map((el, index) => {
														return (
															<li key={index}>
																<Link
																	onClick={() => {
																		setIsOpen(false);
																		setIsMenuOpen(false);
																	}}
																	href={el.path}
																>
																	{el.name}
																</Link>
															</li>
														);
													})}
												</ul>
											)}
										</DropdowmMenuContainer>
									</li>
								);
							} else {
								return (
									<li key={i}>
										<Link
											style={pathname === headerItem.path ? { color: "#000", fontWeight: 600 } : {}}
											onClick={() => setIsMenuOpen(false)}
											href={headerItem.path}
										>
											{headerItem.name}
										</Link>
									</li>
								);
							}
						})}
					</HeaderMenu>
				</nav>
				<div>
					<HeaderIcon src={isMenuOpen ? "images/user-w.svg" : "images/user.svg"} alt="user" />
					<HeaderIcon src={isMenuOpen ? "images/cart-w.svg" : "images/cart.svg"} alt="cart" />
				</div>
			</HeaderContent>
			<MenuOpenBtn onClick={() => setIsMenuOpen(!isMenuOpen)} open={isMenuOpen}>
				<img src={isMenuOpen ? "images/close-menu.svg" : "images/menu-open.svg"} alt="" />
			</MenuOpenBtn>
		</WrapperHeader>
	);
};
const WrapperHeader = styled.div`
	max-width: 1240px;
	width: 100%;
	margin: 40px auto 74px;
	padding: 0 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 1000px) {
		margin-top: 25px;
		margin-bottom: 14px;
		align-items: flex-start;
		padding: 0 10px 30px;
		border-bottom: 1px solid rgb(236, 235, 227);
	}
`;
const HeaderLogo = styled.div<any>`
	font-weight: 800;
	font-size: 24px;
	line-height: 29px;
	cursor: pointer;
	z-index: 5;
	transition: all 0.2s ease-in;
	@media (max-width: 1000px) {
		${({ open }) => {
			if (open) {
				return css`
					transition: all 0.2s ease-in;
					margin-left: 12px;
					color: #fff;
				`;
			}
		}}
	}
`;
const HeaderContent = styled.div<any>`
	display: flex;
	align-items: center;
	z-index: 3;
	@media (max-width: 1000px) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		background: #000;
		height: 100vh;
		padding-top: 100px;
		padding-left: 24px;
		padding-right: 24px;
		z-index: 2;
		transform: translateY(-1300px);
		transition: all 0.2s ease-in;
		& > nav {
			& > ul {
				display: block;
				& > li {
					margin-bottom: 30px;
					& > a {
						color: #fff;
					}
				}
			}
		}
		${({ open }) => {
			if (open) {
				return css`
					transform: translateX(0px);
					transition: all 0.2s ease-in;
				`;
			}
		}}
		& > div {
			margin-top: auto;
			display: flex;
			justify-content: center;
			width: 100%;
			margin-bottom: 40px;
		}
	}
`;
const MenuOpenBtn = styled.div<any>`
	& > img {
		width: 22px;
		height: 14px;
		transform: translateY(5px);
		cursor: pointer;
	}
	z-index: 5;
	display: none;
	transition: all 0.2s ease-in;

	@media (max-width: 1000px) {
		display: block;
		${({ open }) => {
			if (open) {
				return css`
					transition: all 0.2s ease-in;
					margin-right: 14px;
				`;
			}
		}}
	}
`;

const HeaderMenu = styled.ul`
	display: flex;
	& > li {
		margin-right: 47px;
		cursor: pointer;
		& > a {
			color: #1f1f1f;
		}
	}
	margin-right: 13px;
`;
const HeaderIcon = styled.img`
	cursor: pointer;
	&:not(:last-child) {
		margin-right: 36px;
	}
`;

const DropdowmMenuContainer = styled.div<any>`
	position: relative;
	display: inline-block;
	& > div {
		color: #000;
		border: none;
		cursor: pointer;
		padding-right: 20px;
		position: relative;
		&::after {
			content: "";
			width: 12px;
			height: 7px;
			right: 0px;
			top: 7px;
			background-image: url("images/arrow-down.svg");
			transition: 0.2s;
			position: absolute;
			${({ openmenu }) => {
				if (openmenu === "open") {
					return css`
						transform: rotate(180deg);
						transition: 0.2s;
					`;
				}
			}}
			${({ open }) => {
				if (open) {
					return css`
						background-image: url("images/white-arrow.svg");
					`;
				}
			}}
		}
	}

	& > ul {
		transition: 0.2s;
		color: #000;
		position: absolute;
		top: 100%;
		left: 0;
		background-color: #fff;
		border-top: none;
		margin-top: 5px;
		padding: 0;
		list-style: none;
		z-index: 1;
		min-width: 150px;
		margin-left: -20px;
		box-shadow: 0px 0px 60px 30px rgba(0, 0, 0, 0.04);

		& > li {
			padding: 10px 20px;
			cursor: pointer;
			&:hover {
				background-color: #f1f1f1;
			}
		}
	}
	@media (max-width: 1000px) {
		& > div {
			color: #fff;
		}
	}
`;
