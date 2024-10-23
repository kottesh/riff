import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";
import { FaRegCompass, FaCompass } from "react-icons/fa";
import { BsCollection, BsFillCollectionFill } from "react-icons/bs";
import { TbSquareRoundedPlus } from "react-icons/tb";

const CustomTooltip = ({ children, content }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative">
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </div>
            {isVisible && (
                <div
                    className="absolute left-full ml-2 px-2 py-1 bg-gray-900/95 backdrop-blur-sm text-white text-sm rounded whitespace-nowrap z-50"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

const SideBar = () => {
    const location = useLocation();

    const navigationItems = [
        {
            icon: GoHome,
            activeIcon: GoHomeFill,
            text: "Home",
            path: "/",
        },
        {
            icon: RiSearchLine,
            activeIcon: RiSearchFill,
            text: "Search",
            path: "/search",
        },
        {
            icon: BsCollection,
            activeIcon: BsFillCollectionFill,
            text: "Your Library",
            path: "/library",
        },
        {
            icon: TbSquareRoundedPlus,
            activeIcon: TbSquareRoundedPlus,
            text: "Create Playlist",
            path: "/create-playlist",
        },
        {
            icon: FaRegCompass,
            activeIcon: FaCompass,
            text: "Genres",
            path: "/genres",
        },
    ];

    return (
        <div className="flex flex-col w-20 bg-gray-900/95 backdrop-blur-sm h-full p-4 border-r border-gray-800">
            <nav className="space-y-1">
                {navigationItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = isActive ? item.activeIcon : item.icon;

                    return (
                        <CustomTooltip key={item.path} content={item.text}>
                            <Link
                                to={item.path}
                                className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? "bg-gray-800"
                                        : "hover:bg-gray-800/70"
                                }`}
                            >
                                <Icon
                                    size={28}
                                    className={`transition-colors duration-200 ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                />
                            </Link>
                        </CustomTooltip>
                    );
                })}
            </nav>
        </div>
    );
};

export default SideBar;
