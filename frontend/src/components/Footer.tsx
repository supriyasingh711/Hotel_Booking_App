const Footer=()=>{
    return(
        <div className="bg-blue-800 py-10 flex flex-col items-center">
                <div className="container mx-auto flex justify-between items-center">
                    <span className="text-3xl text-white font-bold tracking-tight">
                        HeyHolidays.com
                    </span>
                    <span className="text-white font-bold tracking-tight flex gap-4">
                        <p className="cursor-pointer">Privacy Policy</p>
                        <p className="cursor-pointer">Terms of Services</p>
                    </span>

                </div>
                <h3 className="text-gray-400 ">Made with H&L by Supriya</h3>

        </div>
    )
}
export default Footer;