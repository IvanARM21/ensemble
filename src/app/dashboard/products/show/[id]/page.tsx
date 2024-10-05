import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getProductById } from "@/actions";
import { DashboardPageHeader, ImageSource, ModalAddVariantSuspense } from "@/components";
import { currencyFormat, formattedSizesWithStock } from "@/utils";
import { gendersObj } from "@/constants";
import { OptionsVariant } from "../ui/OptionsVariant";
import { ExpandablesSizes } from "../ui/ExpandablesSizes";

interface Props {
  params: {
    id: string;
  }
}

export default async function ShowByIdPage({params} : Props) {

  const { product } = await getProductById(params.id);
  
  if(!product) redirect("/dashboard/products");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log(`Latitud: ${lat}, Longitud: ${lon}`);
    }, function(error) {
      console.error('Error al obtener la ubicación:', error);
    });
  } else {
    console.log('La geolocalización no es compatible con este navegador.');
  }

  return (
    <>
      <DashboardPageHeader 
        title="Show product"
        url="/dashboard/products"
        btnName="Back"
        type="third"
      />

        <ul className="flex flex-col mt-8">
          <li className="border-b h-20 text-gray-500 flex justify-between items-center gap-5">
            <span className="text-gray-900 font-medium">Name:</span> 
            <span>{product.name}</span>
          </li>
          <li className="border-b h-20 text-gray-500 flex justify-between items-center gap-5">
            <span className="text-gray-900 font-medium">Price: </span>
            <span>{currencyFormat(+product.price)}</span>
          </li>
          <li className="text-gray-500 border-b h-20 flex justify-between items-center gap-5">
            <span className="font-medium text-gray-900">Slug: </span>
            <span><span className="hidden sm:inline">https://ensemble.com</span>/products/<span className="text-gray-900 ml-1">{product.slug}</span></span>
          </li>
          <li className="border-b h-20 flex justify-between items-center gap-5">
            <span className="text-gray-900 font-medium">Gender:</span> 
            <div className="flex justify-center items-center gap-2 text-gray-500">
              <p>{gendersObj[product.gender].label}</p>
              <div className="size-16">
                <ImageSource 
                  width={48}
                  height={56}
                  alt={`Category image ${product.category.label}`}
                  src={gendersObj[product.gender].image}
                  sizes="(min-width: 768px) 64px, 56px"
                  quality={90}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </li>
          <li className="text-gray-500 border-b h-20 flex justify-between items-center gap-5">
            <span className="font-medium text-gray-900">Category:</span>
            <span>
            <div className="flex justify-center items-center gap-2 text-gray-500">
                <p>{product.category.label}</p>
                {product.variants.length && (
                  <div className="size-16">
                    <ImageSource 
                      width={48}
                      height={56}
                      alt={`Category image ${product.category.label}`}
                      src={product.category.image ?? null}
                      sizes="(min-width: 768px) 64px, 56px"
                      quality={90}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </span>
          </li>

          <li className="text-gray-500 border-b h-20 flex justify-between items-center gap-5">
            <span className="font-medium text-gray-900">Description:</span>
            <span className=" max-w-2xl w-fit overflow-auto max-h-20">{product.description}</span>
          </li>

          <li className="flex justify-between items-center gap-5 h-20 border-b text-gray-500 overflow-hidden">
            <span className="font-medium text-gray-900">Materials</span>
            <ul className="flex overflow-auto gap-x-5 gap-y-2 max-w-2xl w-fit">
              {product.materials.map(material => (
                <li key={material} className="border-r pr-5 last-of-type:border-none last-of-type:pr-0">
                  {material}
                </li>
              ))}
            </ul>
          </li>

          <li className="flex justify-between items-center gap-5 h-20 border-b text-gray-500 overflow-hidden">
            <span className="font-medium text-gray-900">Tags</span>
            <ul className="flex overflow-auto gap-x-5 gap-y-2 max-w-2xl w-fit">
              {product.tags.map(material => (
                <li key={material} className="border-r pr-5 last-of-type:border-none last-of-type:pr-0">
                  {material}
                </li>
              ))}
            </ul>
          </li>
        </ul>
        
        <div className="mt-16">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Variants</h2>
            <Link
                href={`/dashboard/products/show/${product.id}?addVariant=true`}
                className="btn-primary shadow-sm shadow-blue-600"
                scroll={false}
            >New variant</Link>
          </div>
          {product.variants.length ? (
            <ul className="flex flex-col mt-10">
              {product.variants.map(variant => (
                <li className="flex justify-between items-center py-4 first-of-type:border-t border-b" key={variant.id}>
                  <div className="flex gap-2">
                    <div className="h-24 w-16">
                      <Image 
                        src={variant.images[0]?.url ?? ""}
                        alt={`Image variant ${variant.name}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                      />
                    </div>
                    <div>
                      <p className="text-gray-700">{variant.name}</p>
                      <p className="text-sm text-gray-500">{currencyFormat(variant.price)}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span>{variant.color.label}</span>
                        <div className="h-4 w-4 rounded-full border" style={{
                          backgroundColor: variant.color.code
                        }}></div>
                      </div>
                      <ExpandablesSizes sizes={formattedSizesWithStock(variant.sizes)} />
                    </div>
                  </div>
                  <OptionsVariant id={variant.id} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No variants have been created yet, {" "}
              <Link
                href={`/dashboard/products/show/${product.id}?addVariant=true`}
                className="text-blue-500 hover:underline underline-offset-4 decoration-blue-500"
              >start by creating one.</Link>
            </p>
          )}
        </div>
        <ModalAddVariantSuspense 
          productId={product.id} 
          productName={product.name}
          productPrice={product.price}
        />
    </> 
  );
}