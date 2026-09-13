import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
    HiOutlineComputerDesktop,
    HiOutlineDevicePhoneMobile,
    HiOutlineCpuChip,
    HiOutlineWrenchScrewdriver,
    HiOutlineShieldCheck,
    HiOutlineTruck,
    HiOutlinePhone,
    HiOutlineEnvelope,
    HiOutlineMapPin,
    HiOutlineClock,
    HiOutlineChatBubbleLeftRight,
    HiOutlineSparkles,
} from "react-icons/hi2";
import {
    FaHeadset,
    FaRegLightbulb,
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaAward,
} from "react-icons/fa";

export default function AboutUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        inquiryType: "Custom PC Build",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Thank you! We received your message and will contact you shortly.");
            setFormData({
                name: "",
                email: "",
                phone: "",
                inquiryType: "Custom PC Build",
                message: "",
            });
        }, 600);
    };

    const stats = [
        { label: "Years of Trust", value: "8+", icon: FaAward },
        { label: "Custom PCs Built", value: "12,000+", icon: HiOutlineComputerDesktop },
        { label: "Authorized Brands", value: "35+", icon: HiOutlineShieldCheck },
        { label: "Happy Customers", value: "25,000+", icon: HiOutlineSparkles },
    ];

    const offerings = [
        {
            title: "Custom PC Builds",
            description: "Custom-built gaming rigs and workstations tailored to your exact budget, software needs, and performance goals with clean cable routing.",
            icon: HiOutlineComputerDesktop,
        },
        {
            title: "Laptops & Notebooks",
            description: "Original brand-new laptops from ASUS, Acer, Lenovo, Dell, HP, and Apple with full official distributor warranties.",
            icon: HiOutlineDevicePhoneMobile,
        },
        {
            title: "Computer Components",
            description: "Genuine CPUs, graphic cards, motherboards, high-speed RAM, reliable power supplies, and NVMe SSDs from top brands.",
            icon: HiOutlineCpuChip,
        },
        {
            title: "Monitors & Gear",
            description: "High-refresh gaming monitors, mechanical keyboards, precision mice, and premium audio headsets to complete your desk.",
            icon: FaHeadset,
        },
        {
            title: "Repairs & Maintenance",
            description: "Desktop and laptop diagnosis, chip-level troubleshooting, thermal repasting, OS optimization, and fast memory/SSD upgrades.",
            icon: HiOutlineWrenchScrewdriver,
        },
        {
            title: "Office & School IT",
            description: "Complete bulk desktop packages, networking accessories, and ongoing IT support for offices, schools, and small businesses.",
            icon: HiOutlineComputerDesktop,
        },
    ];

    const benefits = [
        {
            title: "100% Genuine Products",
            desc: "Every item is brand new and directly sourced from authorized local distributors with official warranty coverage.",
            icon: HiOutlineShieldCheck,
        },
        {
            title: "Honest, Friendly Advice",
            desc: "We recommend components that fit your specific workload and budget, without pushing parts you don't need.",
            icon: FaRegLightbulb,
        },
        {
            title: "Assembled with Care",
            desc: "Each custom PC undergoes meticulous assembly, neat cable management, and extensive stability testing.",
            icon: HiOutlineWrenchScrewdriver,
        },
        {
            title: "Safe Islandwide Delivery",
            desc: "Carefully packed with protective shock cushioning and delivered to your doorstep anywhere in Sri Lanka.",
            icon: HiOutlineTruck,
        },
        {
            title: "Lifetime Technical Support",
            desc: "Our friendly team is always a call or WhatsApp message away whenever you need technical guidance.",
            icon: HiOutlinePhone,
        },
        {
            title: "Hassle-Free Warranty",
            desc: "If any component has an issue, we handle the distributor warranty claim process directly on your behalf.",
            icon: HiOutlineShieldCheck,
        },
    ];

    const teamMembers = [
        {
            name: "Shehan Bandara",
            role: "Founder & Technical Lead",
            bio: "Oversees system engineering and quality control, ensuring every PC build delivers peak reliability.",
            image: "/images/userBoy.jpg",
        },
        {
            name: "Danushka Perera",
            role: "Senior PC Builder",
            bio: "Specializes in custom desktop assembly, thermal management, and comprehensive benchmark validation.",
            image: "/userBoy.jpg",
        },
        {
            name: "Rashmi Fernando",
            role: "Customer Support & Sales",
            bio: "Helps you choose the right machine and parts for your budget, and ensures friendly after-sales assistance.",
            image: "/images/userGirl.jpg",
        },
        {
            name: "Kavinda Silva",
            role: "Hardware & Service Tech",
            bio: "Handles diagnostics, thermal paste service, hardware repairs, and smooth warranty claims.",
            image: "/userGirl.jpg",
        },
    ];

    return (
        <div className="w-full bg-[#f0f7ff] text-slate-800 min-h-screen">

            <section className="relative w-full border-b border-sky-100 py-16 lg:py-24 px-6 lg:px-12 overflow-hidden bg-slate-950">

                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/background1.jpg"
                        alt="i-Computers Showroom"
                        className="w-full h-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-slate-900/55 to-[#f0f7ff]" />
                </div>

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-blue-900 border border-white/60 shadow-md backdrop-blur-md mb-5">
                        <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                        <span>Welcome to i-Computers</span>
                    </span>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                        Powering Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-200">Work, Study &amp; Gaming</span>
                    </h1>

                    <p className="mt-3 text-lg sm:text-xl font-semibold text-sky-200 drop-shadow-sm">
                        Smart Choice, Better Experience
                    </p>

                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white font-bold leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                        We are a trusted computer store in Sri Lanka dedicated to providing original laptops, custom-built desktop PCs, and quality computer accessories at honest, competitive prices.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            to="/products"
                            className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold text-sm shadow-lg shadow-sky-500/30 hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                        >
                            <HiOutlineComputerDesktop className="text-lg" />
                            <span>Browse Products</span>
                        </Link>
                        <a
                            href="#contact-section"
                            className="px-7 py-3 rounded-xl bg-white/90 text-blue-950 font-semibold text-sm border border-white hover:bg-white transition-all duration-200 shadow-md backdrop-blur-md flex items-center gap-2"
                        >
                            <HiOutlineChatBubbleLeftRight className="text-lg text-sky-600" />
                            <span>Contact Us</span>
                        </a>
                    </div>


                    <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {stats.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white/95 backdrop-blur-md border border-white shadow-lg hover:shadow-xl rounded-2xl p-5 text-center hover:border-sky-300 transition-all duration-200"
                                >
                                    <div className="w-10 h-10 mx-auto rounded-xl bg-sky-50 text-blue-600 flex items-center justify-center text-xl mb-2">
                                        <Icon />
                                    </div>
                                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                        {item.value}
                                    </div>
                                    <div className="text-xs font-medium text-slate-600 mt-1">
                                        {item.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            <section className="py-16 lg:py-20 px-6 lg:px-12 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7 space-y-5">
                        <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-md">
                            <span>Who We Are</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-snug">
                            A Team That Truly Cares About Your Computer Setup
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                            i-Computers was founded with a straightforward goal: to make shopping for computer hardware simple, transparent, and trustworthy. We know how frustrating it can be to navigate complex technical specifications or worry about whether a product is genuine.
                        </p>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                            Whether you are putting together your first gaming PC, upgrading your office machines, or finding a dependable laptop for school, our team takes time to understand what you need and gives straightforward, practical recommendations.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-xs flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-sky-50 text-blue-600 text-xl mt-0.5">
                                    <HiOutlineShieldCheck />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900">Official Agent Warranties</h4>
                                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Every unit is covered under genuine distributor warranty terms.</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-xs flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-sky-50 text-blue-600 text-xl mt-0.5">
                                    <HiOutlineWrenchScrewdriver />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900">Dedicated Service Desk</h4>
                                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Prompt technical support and after-sales service you can count on.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-2xl border border-sky-200/80 p-7 shadow-sm space-y-5">
                            <div className="flex items-center gap-4 border-b border-sky-50 pb-5">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-sky-950 flex items-center justify-center p-2 shadow-sm">
                                    <img src="/logo.png" alt="i-Computers" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-slate-900 text-lg">i-Computers Store</h3>
                                    <p className="text-xs text-sky-700 font-medium">Retail &amp; Custom Build Solutions</p>
                                </div>
                            </div>

                            <div className="space-y-3.5 text-sm">
                                <div className="flex justify-between py-2 border-b border-sky-50">
                                    <span className="text-slate-500">Location</span>
                                    <span className="font-semibold text-slate-900">Kurunegala, Sri Lanka</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-sky-50">
                                    <span className="text-slate-500">Products</span>
                                    <span className="font-semibold text-slate-900">Laptops, Desktops, Parts</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-sky-50">
                                    <span className="text-slate-500">Customer Support</span>
                                    <span className="font-semibold text-blue-700">Phone &amp; WhatsApp</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-slate-500">Islandwide Courier</span>
                                    <span className="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs">Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-16 lg:py-24 border-y border-sky-100 px-6 lg:px-12 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/vs.jpg"
                        alt="i-Computers Vision and Strategy"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#eaf4fe]/88 via-sky-50/78 to-[#f4f9ff]/90 backdrop-blur-[1px]" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="inline-block text-xs font-bold text-sky-800 uppercase tracking-wider bg-white/90 px-3.5 py-1 rounded-md border border-sky-200 shadow-xs backdrop-blur-md">
                            Our Principles
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 drop-shadow-xs">
                            Mission &amp; Vision
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        {/* Mission */}
                        <div className="bg-white/95 backdrop-blur-md border border-sky-200/80 rounded-2xl p-7 sm:p-9 shadow-md hover:shadow-xl hover:border-sky-300 transition-all duration-200 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100">Our Purpose</span>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2.5 mb-3">Our Mission</h3>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                    To provide Sri Lankan consumers and businesses with 100% genuine computer hardware, honest technical guidance, and responsive after-sales support so every customer enjoys a smooth computing experience.
                                </p>
                            </div>
                            <div className="mt-7 pt-4 border-t border-sky-100 text-xs font-semibold text-sky-700">
                                Authenticity • Fair Value • Dependable Service
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="bg-white/95 backdrop-blur-md border border-sky-200/80 rounded-2xl p-7 sm:p-9 shadow-md hover:shadow-xl hover:border-sky-300 transition-all duration-200 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100">Where We Are Headed</span>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2.5 mb-3">Our Vision</h3>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                    To be the most trusted computer store in Sri Lanka, recognized for honest service, quality system building, and customer relationships built on integrity and technical reliability.
                                </p>
                            </div>
                            <div className="mt-7 pt-4 border-t border-sky-100 text-xs font-semibold text-sky-700">
                                Long-term Trust • Community Support • Tech Excellence
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="relative w-full py-18 lg:py-24 border-y border-sky-100 overflow-hidden bg-gradient-to-br from-[#e6f3fe] via-[#f2f8ff] to-[#e1f0fe]">
                {/* Silky Ambient Glow Spheres for Depth */}
                <div className="absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full bg-sky-300/30 blur-[110px] pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-cyan-200/25 blur-[100px] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider bg-white/90 px-3.5 py-1.5 rounded-full border border-sky-200 shadow-xs backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                            <span>Products &amp; Services</span>
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 tracking-tight drop-shadow-xs">
                            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500">Offer</span>
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
                            Find everything you need for home, school, gaming, and business computing.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {offerings.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="relative bg-white/95 backdrop-blur-md border border-sky-200/70 rounded-2xl p-6 hover:border-sky-400 shadow-[0_4px_20px_rgba(30,58,138,0.04)] hover:shadow-[0_16px_36px_rgba(2,132,199,0.13)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                                >
                                    {/* Top subtle gradient accent on hover */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div>
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white flex items-center justify-center text-xl mb-4 shadow-sm shadow-sky-500/25 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-sky-500/35 transition-all duration-300">
                                            <Icon />
                                        </div>
                                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between">
                                        <Link
                                            to="/products"
                                            className="text-xs font-bold text-blue-600 group-hover:text-sky-600 inline-flex items-center gap-1.5 transition-colors"
                                        >
                                            <span>View in store</span>
                                            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                        </Link>
                                        <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                                            Official Warranty
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative py-16 lg:py-24 border-y border-sky-100 px-6 lg:px-12 overflow-hidden">
                {/* Customer Benefits Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/VS2.jpg"
                        alt="Why Choose i-Computers"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-50/20 via-transparent to-sky-100/30" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="inline-block text-xs font-bold text-sky-800 uppercase tracking-wider bg-white/90 px-3.5 py-1 rounded-md border border-sky-200 shadow-xs backdrop-blur-md">
                            Customer Benefits
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 drop-shadow-xs">
                            Why Choose i-Computers
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
                            We focus on genuine hardware, clear communication, and reliable support.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-md hover:shadow-xl hover:border-sky-300 hover:bg-white transition-all duration-200"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-sky-50 text-blue-600 flex items-center justify-center text-xl mb-3.5 shadow-2xs">
                                        <Icon />
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            <section className="py-16 lg:py-20 px-6 lg:px-12 max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="inline-block text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-md">
                        Our People
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
                        Meet Our Team
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 mt-2">
                        The dedicated staff behind your custom builds and daily store support.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, idx) => (
                        <div
                            key={idx}
                            className="bg-white border border-sky-100 rounded-2xl overflow-hidden shadow-xs hover:border-sky-300 hover:shadow-md transition-all duration-200 flex flex-col"
                        >
                            <div className="w-full aspect-square bg-gradient-to-b from-sky-100 to-blue-50 flex items-center justify-center overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top"
                                    onError={(e) => {
                                        e.target.src = "/logo.png";
                                    }}
                                />
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-extrabold text-slate-900 text-base">
                                        {member.name}
                                    </h3>
                                    <p className="text-xs font-semibold text-sky-700 mt-0.5">
                                        {member.role}
                                    </p>
                                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="contact-section" className="py-16 lg:py-20 bg-gradient-to-b from-[#eaf4fe] via-white to-[#f0f7ff] border-t border-sky-100 px-6 lg:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="inline-block text-xs font-bold text-sky-700 uppercase tracking-wider bg-white px-3 py-1 rounded-md border border-sky-200">
                            Get In Touch
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
                            Contact Information
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 mt-2">
                            Reach out for PC build advice, pricing quotes, or visit our showroom.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        <div className="lg:col-span-5 space-y-4">

                            <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-sky-50 text-blue-600 text-xl mt-0.5">
                                    <HiOutlineMapPin />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900">Showroom Address</h4>
                                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                                        No.45, Dambulla Road,Kurunegala, Sri Lanka.
                                    </p>
                                </div>
                            </div>


                            <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-sky-50 text-blue-600 text-xl mt-0.5">
                                    <HiOutlinePhone />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900">Call Us</h4>
                                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                                        Hotline: <a href="tel:+94372235942" className="font-semibold text-slate-800 hover:text-blue-700">+94 (11) 234 5678</a>
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                        Mobile: <a href="tel:+94702365637" className="font-semibold text-slate-800 hover:text-blue-700">+94 (77) 123 4567</a>
                                    </p>
                                </div>
                            </div>


                            <a
                                href="https://wa.me/94771234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between hover:shadow-sm transition-all group"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="p-3 rounded-xl bg-white border border-emerald-200 text-emerald-600 text-2xl shadow-2xs">
                                        <FaWhatsapp />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-emerald-900">Chat on WhatsApp</h4>
                                        <p className="text-xs text-emerald-700">Quick quotes and instant replies</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white group-hover:bg-emerald-700 transition-colors shadow-2xs">
                                    Message
                                </span>
                            </a>


                            <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-sky-50 text-blue-600 text-xl mt-0.5">
                                    <HiOutlineEnvelope />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900">Email Address</h4>
                                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                                        sales@icomputers.lk / support@icomputers.lk
                                    </p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-sky-50 text-blue-600 text-xl mt-0.5">
                                    <HiOutlineClock />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900">Opening Hours</h4>
                                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                                        Monday – Saturday: 9:00 AM – 7:00 PM
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                        Sunday: 10:00 AM – 4:00 PM
                                    </p>
                                </div>
                            </div>


                            <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-600">Follow us online:</span>
                                <div className="flex items-center gap-3 text-lg text-slate-600">
                                    <a href="#" className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center hover:text-blue-700 hover:bg-sky-100 transition-all" aria-label="Facebook">
                                        <FaFacebook />
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center hover:text-pink-600 hover:bg-sky-100 transition-all" aria-label="Instagram">
                                        <FaInstagram />
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center hover:text-red-600 hover:bg-sky-100 transition-all" aria-label="YouTube">
                                        <FaYoutube />
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className="lg:col-span-7">
                            <div className="bg-white border border-sky-200/80 rounded-3xl p-7 sm:p-9 shadow-sm">
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                                    Send Us a Message
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 mb-6">
                                    Fill out the form below with your requirements and our team will contact you shortly.
                                </p>

                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                                Your Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Kamal Perera"
                                                required
                                                className="w-full px-4 py-2.5 rounded-xl bg-sky-50/40 border border-sky-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-sky-100 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="kamal@example.com"
                                                required
                                                className="w-full px-4 py-2.5 rounded-xl bg-sky-50/40 border border-sky-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-sky-100 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                                Phone / WhatsApp
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="077 123 4567"
                                                className="w-full px-4 py-2.5 rounded-xl bg-sky-50/40 border border-sky-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-sky-100 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                                Inquiry Type
                                            </label>
                                            <select
                                                name="inquiryType"
                                                value={formData.inquiryType}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-xl bg-sky-50/40 border border-sky-200 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-sky-100 transition-all"
                                            >
                                                <option value="Custom PC Build">Custom PC Build Quote</option>
                                                <option value="Laptop Purchase">Laptop Inquiry</option>
                                                <option value="Component Upgrade">Component Upgrade</option>
                                                <option value="Repairs & Service">Repairs &amp; Service</option>
                                                <option value="General Question">General Question</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">
                                            Your Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Tell us what you are looking for or the budget you have in mind..."
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl bg-sky-50/40 border border-sky-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-sky-100 transition-all resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/20 hover:shadow-lg transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <HiOutlineChatBubbleLeftRight className="text-lg" />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
