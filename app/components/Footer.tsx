import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-brand-darkest text-white py-12 border-t border-brand-light/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/Logo.png"
                                alt="TarkAI Logo"
                                width={150}
                                height={50}
                                className="h-16 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Where intelligence meets education
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://wa.me/919712358689" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors"><FaWhatsapp size={20} /></a>
                            <a href="https://www.linkedin.com/company/tarkai-edtech-pvt-ltd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors"><FaLinkedin size={20} /></a>
                            <a href="https://www.instagram.com/tarkaiedtech/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors"><FaInstagram size={20} /></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-6 text-brand-accent">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="text-gray-400 hover:text-brand-light transition-colors">About Us</Link></li>
                            <li><Link href="/team" className="text-gray-400 hover:text-brand-light transition-colors">Team</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-6 text-brand-accent">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/programs" className="text-gray-400 hover:text-brand-light transition-colors">Programs</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-brand-light transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-6 text-brand-accent">Contact</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <a href="mailto:tarkaiedtech@gmail.com" className="hover:text-brand-light transition-colors">tarkaiedtech@gmail.com</a>
                            </li>
                            <li>+91 97123 58689</li>
                            <li>Surat, Gujarat</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} TarkAI EdTech Pvt. Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
