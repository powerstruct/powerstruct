"use client";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import imdos from "@/lib/imdos";
import useSWR from "swr";
import { FILEPATH } from "@/lib/config";

const Page = () => {
  const fetcher = async () => {
    const data = await imdos.request("SELECT * FROM galleries");
    return data;
  };
  const { data: galleries } = useSWR("/galleries", fetcher);

  return (
    <div>
      <Navbar />
      {galleries?.length > 0 ? (
        <div className="py-16 px-4 sm:px-6 lg:px-8" id="gallery">
          <div className="max-w-full mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gallery</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Explore our collection of project images showcasing our expertise
              and successful implementations.
            </p>
          </div>
          <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-end">
            {galleries?.length > 0 &&
              galleries?.map((gallery, index) => (
                <div
                  key={gallery?.id || index}
                  className="aspect-square animate-fadeIn rounded-xl cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <img
                    src={FILEPATH + gallery?.image}
                    alt="Powerstruct Gallery Image"
                    className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <img
            src="/assets/graphics/infinite-spinner.svg"
            alt="Loading..."
            className="w-16 h-16 lg:w-24 lg:h-24"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Page;
