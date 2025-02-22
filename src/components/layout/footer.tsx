import { companyInfo } from "@/constants/footer";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white px-6 py-8">
      <div className="mx-auto max-w-screen-xl text-[11px] text-gray-500">
        <p className="font-medium">{companyInfo.name}</p>
        <div className="space-y-2">
          <p>{companyInfo.address}</p>
          <p>Tel: {companyInfo.tel}</p>
          <p>Email: {companyInfo.email}</p>
          <p>사업자등록번호: {companyInfo.businessNumber}</p>
        </div>
        <p className="text-gray-400">
          © {new Date().getFullYear()} Hanteo Global. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
