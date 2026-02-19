import Link from "next/link";
import Image from "next/image";
import menuright from "@/public/assets/menurightarrow.svg";

export default function SitemapList() {
    return (
        <section className="pb-[50px] lg:pb-[141px]  pt-[20px] sm:pt-[50px] lg:pt-[130px]">
            <div className="container mx-auto px-6">
                <div className="border-b my-10">
                    <h1 className="title-80 mb-10">Sitemap</h1>
                </div>
                
                <div className="flex flex-col md:flex-row items-left md:items-center gap-4 md:gap-10 mb-5">
                    <div className="mb-2 lg:mb-0">
                        <div className="flex  items-center gap-2">
                            <div className="h-3 w-3 bg-primary"></div>
                            <h2 className="text-[25px] leading-[1.5] text-gray1 font-[500]"><Link href="/">Home</Link></h2>
                        </div>
                    </div>
                    <div className="mb-2 lg:mb-0"><div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-primary"></div><h2 className="text-[25px] leading-[1.5] text-gray1 font-[500]"><Link href="/about-us">About</Link></h2>
                    </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 mb-5">
                    <div className="h-3 w-3 bg-primary"></div>
                    <h2 className="text-[25px] leading-[1.5] text-gray1 font-[500]" >Services</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6 md:mb-0">

                    {/* Creative Services */}
                    <div>
                        <h3 className=" mb-6 text-19 leading-[1.5] text-gray1">
                            <Link className="flex items-center gap-2 " href="/creative-agency-dubai">Creative Services <Image
                                src={menuright}
                                alt="arrow"
                                className="m-0 p-0 filter brightness-[0.5] "

                            /></Link>
                        </h3>

                        <ul className="space-y-3 text-gray-400 pl-3">
                            <li><Link href="/branding-agency-dubai">Branding</Link></li>
                            <li><Link href="/logo-design-agency-dubai">Logo Design</Link></li>
                            <li><Link href="/graphic-design-agency-dubai">Graphic Design</Link></li>
                            <li><Link href="/creative-copywriting-agency-dubai">Copywriting</Link></li>
                            <li><Link href="/content-production-agency-dubai">Content Production</Link></li>
                        </ul>
                    </div>
                    {/* Marketing Intelligence */}
                    <div>
                        <h3 className=" mb-6 text-19 leading-[1.5] text-gray1 mt-4 sm:mt-0">
                            <Link className="flex items-center gap-2 " href="/marketing-intelligence-agency-dubai">Marketing Intelligence <Image
                                src={menuright}
                                alt="arrow"
                                className="m-0 p-0 filter brightness-[0.5] "

                            /></Link>
                        </h3>

                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="/marketing-strategy-consulting">Strategy Consulting</Link></li>
                            <li><Link href="/data-analytics-services-dubai">Data & Analytics</Link></li>
                            <li><Link href="/conversion-rate-optimization-agency-dubai">Conversion Rate Optimization</Link></li>
                            <li><Link href="/marketing-automation-agency-dubai">Marketing Automation</Link></li>
                        </ul>
                    </div>

                    {/* Web Design & Development */}
                    <div>
                        <h3 className=" mb-6 text-19 leading-[1.5] text-gray1 mt-4 sm:mt-0">
                            <Link className="flex items-center gap-2 " href="/web-design-and-development">Web Design & Development <Image
                                src={menuright}
                                alt="arrow"
                                className="m-0 p-0 filter brightness-[0.5] "

                            /></Link>
                        </h3>

                        <ul className="space-y-3 text-gray-400 pl-3">
                            <li><Link href="/web-development-agency-dubai">Web Development</Link></li>
                            <li><Link href="/web-design-agency-dubai">Website Design</Link></li>
                            <li><Link href="/mobile-app-development-company-dubai">Mobile App</Link></li>
                            <li><Link href="/web-app-dev-agency">Web Apps</Link></li>
                            <li><Link href="/e-commerce-web-development-company">Ecommerce Development</Link></li>
                        </ul>
                    </div>

                    {/* Digital Marketing */}
                    <div>
                        <h3 className=" mb-6 text-19 leading-[1.5] text-gray1 mt-4 sm:mt-0">
                            <Link className="flex items-center gap-2 " href="/digital-marketing-services">Digital Marketing <Image
                                src={menuright}
                                alt="arrow"
                                className="m-0 p-0 filter brightness-[0.5] "
                            /></Link>
                        </h3>

                        <ul className="space-y-3 text-gray-400 pl-3">
                            <li><Link href="/performance-marketing-agency-dubai">Performance Marketing</Link></li>
                            <li><Link href="/seo-agency-dubai">Search Engine Optimisation</Link></li>
                            <li><Link href="/social-media-agency-dubai">Social Media Services</Link></li>
                            <li><Link href="/content-marketing-agency-dubai">Content Marketing</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row items-left md:items-center gap-4 md:gap-10 my-5 ">
                    <div className="">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 bg-primary"></div>
                            <h2 className="text-[25px] leading-[1.5] text-gray1 font-[500]"><Link href="/industry">Industries</Link></h2>
                        </div>
                    </div>
                    <div className=""><div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-primary"></div><h2 className="text-[25px] leading-[1.5] text-gray1 font-[500]"><Link href="/portfolio">Portfolio</Link></h2>
                    </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 mb-5">
                    <div className="h-3 w-3 bg-primary"></div>
                    <h2 className="text-[25px] leading-[1.5] text-gray1 font-[500]" >Insight</h2>
                </div>

                <div className="flex gap-10 mb-6 md:mb-0">
                    <div className="flex items-center gap-2 ">
                        <Link className="flex items-center gap-2 " href="/blogs">
                            <h3 className="text-19 leading-[1.5] text-gray1">
                                Blogs
                            </h3>
                            <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="duration-200 ease-in-out group-hover:scale-125 "><g clip-path="url(#clip0_65_58)"><path d="M18.7892 1.2749L0.699219 19.0149" stroke="#77787b" stroke-width="3" stroke-miterlimit="10" className="group-hover:stroke-black"></path><path d="M0.699219 1.2749H18.7892V18.6649" stroke="#77787b" stroke-width="3" stroke-miterlimit="10" className="group-hover:stroke-black"></path></g><defs><clipPath id="clip0_65_58"><rect width="19.79" height="19.45" fill="white" transform="translate(0 0.274902)"></rect></clipPath></defs></svg>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 ">
                        <Link className="flex items-center gap-2 " href="/case-study" >
                            <h3 className=" text-19 leading-[1.5] text-gray1">
                                Case Studies
                            </h3>
                            <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="duration-200 ease-in-out group-hover:scale-125 "><g clip-path="url(#clip0_65_58)"><path d="M18.7892 1.2749L0.699219 19.0149" stroke="#77787b" stroke-width="3" stroke-miterlimit="10" className="group-hover:stroke-black"></path><path d="M0.699219 1.2749H18.7892V18.6649" stroke="#77787B" stroke-width="3" stroke-miterlimit="10" className="group-hover:stroke-black"></path></g><defs><clipPath id="clip0_65_58"><rect width="19.79" height="19.45" fill="white" transform="translate(0 0.274902)"></rect></clipPath></defs></svg>
                        </Link>

                    </div>



                </div>
                <div className="flex flex-col md:flex-row items-left md:items-center gap-4 md:gap-10 mt-5 ">
                    <div className="mb-2 lg:mb-0">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 bg-primary"></div>
                            <h2 className="text-[25px] leading-[1.5] text-gray1 font-[500]"><Link href="/careers">Careers</Link></h2>
                        </div>
                    </div>
                    <div className="mb-2 lg:mb-0"><div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-primary"></div><h2 className="text-[25px] leading-[1.5] text-gray1 font-[500]"><Link href="/contact-us">Contact Us</Link></h2>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
