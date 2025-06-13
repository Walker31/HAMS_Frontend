    import { useState } from "react";
    import LocationModal from "./locationBox";
    import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

    
    const navigation = [
    { name: "Health", href: "#", current: false },
    { name: "Medicines & Health Services", href: "#", current: false },
    { name: "Services", href: "#", current: false },
    { name: "About Us", href: "#", current: false },
    ];

    function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
    }

    const NavbarAlt = () => {
    const [selected, setSelected] = useState("Health");
    const [open, setOpen] = useState(false);

    return (
        <>
        <div className="flex items-center justify-between px-6 sm:px-12 h-16 shadow bg-white">
            {/* Left: Logo */} 
            <div className="text-2xl font-bold text-black">HAMS</div>

            {/* Center: Navigation */}
            <div className="hidden md:flex justify-center flex-1 space-x-6">
            {navigation.map((item) => (
                <div
                key={item.name}
                href={item.href}
                onClick={() => setSelected(item.name)}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                selected === item.name
                  ? "border-b-2 border-[#527C88] text-[#527C88]"
                  : "hover:border-b-2 hover:text-[#527C88] border-[#527C88]",
                "px-3 py-2 text-sm font-medium transition"
                )}
                >
                {item.name}
                </div>
            ))}
            </div>

            {/* Right: Location + SignUp */}
            <div className="flex items-center gap-4">
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-full p-1 text-black hover:text-blue-600 focus:outline-none"
            >
                <span className="sr-only">View location</span>
                <LocationOnOutlinedIcon className="text-xl" />
            </button>

            <div className="rounded-full bg-[#10217D] hover:bg-[#1a2bb8] transition">
                <button className="text-white px-4 py-2 text-sm font-medium">
                SignUp / Login
                </button>
            </div>
            </div>
        </div>

        <LocationModal open={open} onClose={() => setOpen(false)} />
        </>
    );
    };

    export default NavbarAlt;
