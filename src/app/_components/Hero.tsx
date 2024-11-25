import React from 'react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-gray-50 flex- item-center flex-col">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Menage your budget <br />
                <span className="text-4xl md:text-[6rem] font-bold text-blue-800 mt-1 leading-none">
                  Financial tracker
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/Screenshot_70.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </section>
  );
}
