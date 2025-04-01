import { LogoIcon } from "./assets/LogoIcon";
import { MailIcon } from "./assets/MailIcon";
import { PhoneIcon } from "./assets/PhoneIcon";

export const Footer: React.FunctionComponent = () => {
  return (
    <div className="w-full bg-[#4338CA] h-[308px] lg:h-70 lg:px-20 py-10 px-5   text-white lg:flex lg:justify-between">
      <div className="flex flex-col lg:gap-3">
        <p className="font-bold flex gap-2">
          <LogoIcon color={"white"} />
          Movie Z
        </p>
        <p className="text-[14px]">© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex lg:gap-24 gap-12">
        <div className="flex flex-col lg:gap-6 mt-15 lg:mt-none">
          <p>Contact Information</p>
          <div className="h-10  lg:w-[174px] flex items-center gap-3">
            <div>
              <MailIcon />
            </div>
            <div>
              <p>Email:</p>
              <p>support@movieZ.com</p>
            </div>
          </div>
          <div className="h-10  lg:w-[174px] flex items-center gap-3">
            <div>
              <PhoneIcon />
            </div>
            <div>
              <p>Phone:</p>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="mt-15 lg:mt-none">
          <p>Follow us </p>
          <div className="gap-3 lg:flex">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
        </div>
      </div>
    </div>
  );
};
