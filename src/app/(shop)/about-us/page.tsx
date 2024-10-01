import { Title, SubTitle } from "@/components";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <section className="mt-8">
      <Title>
        About us
      </Title>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 mt-10">
        <article className="order-2 lg:order-1 flex flex-col gap-8">
          <div>
            <SubTitle
              otherStyles="text-2xl mb-4 border-b"
            >
              Who we are
            </SubTitle>
            <p className="text-gray-500">At Ensemble, fashion is not just about clothing—it&rsquo;s about expressing who you are. Established in 2023, our store is a destination where style meets comfort, and quality is always at the forefront.</p>
          </div>
         
          <div>
            <SubTitle
              otherStyles="text-2xl mb-4 border-b"
            >
              Our mission
            </SubTitle>
            <p className="text-gray-500">Our mission is to offer a unique shopping experience that celebrates individuality and personal style. We strive to provide our customers with high-quality garments that inspire and enhance their wardrobe. From the latest trends to classic staples, our selection is designed to cater to diverse tastes and preferences.</p>
          </div>

          <div>
            <SubTitle
              otherStyles="text-2xl mb-4 border-b"
            >
              Our vision
            </SubTitle>
            <p className="text-gray-500">Looking forward, our vision is to continue evolving with the fashion landscape while staying true to our core values. We are excited to expand our offerings and continue providing you with the best in fashion and customer experience.</p>
          </div>
        </article>
        <div className="flex flex-col justify-center items-center lg:order-2 order-1">
          <div className="pr-20 ">
              <Image 
                src={"/about-us-1.jpg"}
                width={700}
                height={700}
                alt="About Us Image"
                sizes="(min-width: 820px) 700px, (min-width: 1024px) 40vw, (min-width: 1480px) 660px, 88vw"
                className="rounded-lg w-[500px]"
              />
          </div>

          <div className="-mt-20 pl-20 min-[480px]:-mt-40 lg:-mt-36 lg:pl-40">
              <Image 
                src={"/about-us-2.jpg"}
                width={700}
                height={700}
                alt="About Us Image"
                sizes="(min-width: 820px) 700px, (min-width: 1024px) 40vw, (min-width: 1480px) 580px, 88vw"
                className="rounded-lg w-[500px]"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
