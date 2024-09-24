import Link from "next/link";
import React from "react";
import { BsGithub } from "react-icons/bs";
import { VscKey, VscRepo } from "react-icons/vsc";

// Tipleri ekleyelim
type HeaderProps = {
    activeTab: string;
    setActiveTab: (tab: string) => void; // setActiveTab tipi
};

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
    return (
        <header className="fixed top-0 w-screen p-4 z-10">
            <div className="flex justify-between px-6 items-center">
                {/* API Key */}
                <Link href={"?settings=open"}>
                    <VscKey className="text-4xl hover:text-blue-500 transition-colors cursor-pointer" />
                </Link>

                {/* Tab Seçimi */}
                <div className="flex space-x-4">
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                            activeTab === "map"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        onClick={() => setActiveTab("map")}
                    >
                        Harita ile Seçim
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                            activeTab === "list"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        onClick={() => setActiveTab("list")}
                    >
                        Şehir Listesi ile Seçim
                    </button>
                </div>

                {/* Github Hesap ve Repo İkonları */}
                <div className="flex space-x-4">
                    {/* Github Hesap */}
                    <Link target="_blank" href={"https://github.com/sanderyaz"}>
                        <BsGithub className="text-4xl hover:text-blue-500 transition-colors cursor-pointer" />
                    </Link>

                    {/* Github Repo */}
                    <Link target="_blank" href={"https://github.com/sanderyaz/weather-sander"}>
                        <VscRepo className="text-4xl hover:text-blue-500 transition-colors cursor-pointer" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
