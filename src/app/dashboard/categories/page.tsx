import Link from "next/link";
import { 
  DashboardPageHeader, 
  TableRoot, 
  Table, 
  TableHead, 
  TableRow, 
  TableHeaderCell,
  TableBody,
  TableCell,
  Options,
  ImageSource
} from '@/components';
import { deleteCategory, getCategories } from "@/actions";
import { formattCategoriesByGender } from "@/utils";

export default async function CategoriesDashboardPage() {

  const categories = await getCategories();
  const formattCategories = formattCategoriesByGender(categories);

  return (
    <>
      <DashboardPageHeader 
        title="Categories list" 
        url="/dashboard/categories/new" 
        type="primary"
        btnName="New category"
      />

      {categories.length ? (
        <TableRoot className="mt-8">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>#</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Gender</TableHeaderCell>
                <TableHeaderCell>Slug</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formattCategories.map(category => (
                <TableRow key={category.id} className="group">
                  <TableCell>
                    #{category.id.split("-")[0]}
                  </TableCell>
                  <TableCell className="flex items-center gap-1">
                    {category.image ? (
                      <div className="size-14 md:size-16">
                        <ImageSource 
                          width={56}
                          height={56}
                          alt={`Category image ${category.label}`}
                          src={category.image as string}
                          sizes="(min-width: 768px) 64px, 56px"
                          quality={90}
                          className="w-full h-full object-cover rounded-xl shadow-md"
                        />
                      </div>
                    ) : (
                      <div className="size-14 md:size-20 bg-gray-900 font-medium text-white flex justify-center items-center rounded-xl shadow-md">
                        No image
                      </div>
                    )}
                    <p className="text-nowrap">
                      {category.label}
                    </p>
                  </TableCell>
                  <TableCell className="capitalize">
                    {category.gender ?? "unisex"}
                  </TableCell>
                  <TableCell>
                   {category.slug}
                  </TableCell>
                  <TableCell>
                    {category.type}
                  </TableCell>
                  <TableCell>
                    <Options
                      uriShow={`/dashboard/categories/${category.id}`}
                      uriEdit={`/dashboard/categories/edit/${category.id}`}
                      id={category.id}
                      callback={deleteCategory}
                      title="Delete category"
                      message="Are you sure to remove this category? This action isn't reversible."
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
      ) : (
        <p className="text-gray-500">No categories have been created yet, {" "}
            <Link
              href={"/dashboard/categories/new"}
              className="text-blue-500 hover:underline underline-offset-4 decoration-blue-500"
            >start by creating one.</Link>
        </p>
      )}
    </>
  );
}