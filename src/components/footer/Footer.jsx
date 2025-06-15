import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../Logo";

function Footer() {
    return (
        <footer className="bg-gray-900 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <div className="mb-4">
                            <Logo width="50px" />
                        </div>
                        <p className="text-sm text-gray-400">
                            &copy; 2024 Ishan. All rights reserved.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 mb-4">
                            Company
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link className="text-sm text-gray-400 hover:text-blue-400" to="/">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link className="text-sm text-gray-400 hover:text-blue-400" to="/">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link className="text-sm text-gray-400 hover:text-blue-400" to="/">
                                    Affiliate Program
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 mb-4">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link className="text-sm text-gray-400 hover:text-blue-400" to="/">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link className="text-sm text-gray-400 hover:text-blue-400" to="/">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link className="text-sm text-gray-400 hover:text-blue-400" to="/">
                                    Privacy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link className="text-sm text-gray-400 hover:text-blue-400" to="/">
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link className="text-sm text-gray-400 hover:text-blue-400" to="/">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link className="text-sm text-gray-400 hover:text-blue-400" to="/">
                                    Cookies
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;