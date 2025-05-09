import Image from 'next/image';
import Link from "next/link";


export default function Home() {
  return (
    <div className="w-full min-h-full">
    
    <div className=" mx-auto px-4">
      <div className="m-1 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Build Your{" "}
            <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
              Resume Effortlessly
            </span>
          </h1>
          <p className="text-lg text-gray-700 mb-15">
            Your one-stop solution for creating stunning CVs.
          </p>
          <Link
          href="/dashboard"
          className="inline-block bg-black text-sm font-semibold text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Get started
        </Link>
        </div>
        <div className="w-full md:w-1/2 py-2 relative aspect-[4/3]"> {/* Adjust aspect ratio as needed */}
  <Image
    src="/assets/IMG.png"
    alt="Description of image"
    fill
    className="rounded-lg object-cover"
  />
</div>
      </div>
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-center mb-12">
          Features That Makes u shine 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl shwadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-3">Easy Editing </h3>
              <p className="text-gray-700">
              Update Your resume sections with live preview and instant formatting
              </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shwadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-3">
              Multiple Templates
            </h3>
            <p className="text-gray-700">
              Choose from a variety of professionally designed templates to suit your style.
            </p>
          </div>

          
          <div className="bg-gray-50 p-6 rounded-xl shwadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-3">
             One click Download
            </h3>
            <p className="text-gray-700">
              Download your resume in multiple formats PDF with a single click.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
  
  );
}
