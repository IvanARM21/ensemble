import Link from "next/link";
import { deleteSize, getSizes } from "@/actions";
import { DashboardPageHeader, Options, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow } from "@/components";
import { formattedSizes } from "@/utils";

export default async function SizesDashboardPage() {

  const sizes = await getSizes();

  const sizesOrder = formattedSizes(sizes ?? []);

  return (
    <>
      <DashboardPageHeader 
          title="Sizes list" 
          url="/dashboard/sizes/new"
          type="primary"
          btnName="New size"
        />

      {sizesOrder.length ? (
        <TableRoot className="mt-8">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>#</TableHeaderCell>
                <TableHeaderCell>Size</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Order</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sizesOrder.map(size => (
                <TableRow key={size.id} className="group">
                  <TableCell>
                    #{size.id.split("-")[0]}
                  </TableCell>
                  <TableCell>
                    {size.label}
                  </TableCell>
                  <TableCell>
                    {size.type}
                  </TableCell>
                  <TableCell>
                    {size.order}
                  </TableCell>
                  <TableCell>
                    <Options
                      uriShow={`/dashboard/sizes/${size.id}`}
                      uriEdit={`/dashboard/sizes/edit/${size.id}`}
                      id={size.id}
                      callback={deleteSize}
                      title="Delete size"
                      message="Are you sure to remove this size? This action isn't reversible."
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
      ) : (
        <p className="text-gray-500">No sizes have been created yet, {" "}
          <Link
            href={"/dashboard/sizes/new"}
            className="text-blue-500 hover:underline underline-offset-4 decoration-blue-500"
          >start by creating one.</Link>
        </p>
      )}
    </>
  );
}