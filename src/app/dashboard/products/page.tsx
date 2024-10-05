import Link from "next/link";
import { deleteProduct, getAllProductAndNumVar } from "@/actions";
import { 
  DashboardPageHeader, 
  TableRoot,
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableBody,
  TableCell,
  Options,
  ImageSource
} from "@/components";
import { currencyFormat } from "@/utils";
import { gendersObj } from "@/constants";

export default async function DashboardProductsPage() {

  const products = await getAllProductAndNumVar();

  return (
    <>
      <DashboardPageHeader 
        title="Products list"
        url="/dashboard/products/new"
        type="primary"
        btnName="New product"
      />

      {products.length ? (
        <TableRoot className="mt-8">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>#</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Gender</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Slug</TableHeaderCell>
                <TableHeaderCell>Variants</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id} className="group">
                  <TableCell>
                    #{product.id.split("-")[0]}
                  </TableCell>
                  <TableCell className="flex items-center gap-1">
                    <div className="h-20 w-14">
                        <ImageSource 
                          width={100}
                          height={100}
                          alt={`Image Variant of ${product.variants[0]?.name}`}
                          src={product.variants[0]?.images[0]?.url ?? null}
                          quality={90}
                          className="w-full h-full object-cover rounded-lg shadow"
                        />
                      </div>
                    <p className="text-nowrap">
                      {product.name}
                    </p>
                  </TableCell>
                  <TableCell>
                    {currencyFormat(+product.price)}
                  </TableCell>
                  <TableCell>
                    {gendersObj[product.gender].label}
                  </TableCell>

                  <TableCell>
                    {product.category.label}
                  </TableCell>
                  <TableCell>
                    {product.slug}
                  </TableCell>
                  <TableCell>
                    {product._count.variants}
                  </TableCell>
                  <TableCell>
                    <Options
                      uriShow={`/dashboard/products/show/${product.id}`}
                      uriEdit={`/dashboard/products/edit/${product.id}`}
                      id={product.id}
                      callback={deleteProduct}
                      title="Delete product"
                      message="Are you sure you want to delete this product? Your variants will also be deleted and this action isn't reversible."
                    />
                  </TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </TableRoot>
      ) : (
        <p className="text-gray-500">No products have been created yet, {" "}
            <Link
              href={"/dashboard/products/show"}
              className="text-blue-500 hover:underline underline-offset-4 decoration-blue-500"
            >start by creating one.</Link>
        </p>
      )}
    </>
  );
}
