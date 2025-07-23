import { LogoIcon } from "./assets/LogoIcon";
import { MailIcon } from "./assets/MailIcon";
import { PhoneIcon } from "./assets/PhoneIcon";

export const Footer = () => {
  return (
    <div className="w-full bg-[#4338CA] text-white py-10 px-5 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <LogoIcon color="white" />
              Movie Z
            </div>
            <p className="text-sm">© 2024 Movie Z. All Rights Reserved.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24">
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-lg">Contact Information</h3>

              <div className="flex items-start gap-3">
                <MailIcon />
                <div>
                  <p className="text-sm">Email:</p>
                  <p className="text-sm md:text-base">support@movieZ.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneIcon />
                <div>
                  <p className="text-sm">Phone:</p>
                  <p className="text-sm md:text-base">+976 (11) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-lg">Follow us</h3>
              <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                <a href="#" className="text-sm hover:underline">
                  Facebook
                </a>
                <a href="#" className="text-sm hover:underline">
                  Instagram
                </a>
                <a href="#" className="text-sm hover:underline">
                  Twitter
                </a>
                <a href="#" className="text-sm hover:underline">
                  Youtube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
