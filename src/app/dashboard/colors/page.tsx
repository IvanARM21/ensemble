import Link from "next/link";
import { DashboardPageHeader, Options, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow } from "@/components";
import { getColors, deleteColor } from "@/actions";

export default async function ColorsDashboardPage() {

    const colors = await getColors();

    return (
      <>
        <DashboardPageHeader 
          title="Colors" 
          url="/dashboard/colors/new"
          type="primary"
          btnName="New color"
        />

        {colors?.length ? (
          <TableRoot className="mt-8">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>#</TableHeaderCell>
                  <TableHeaderCell>Label</TableHeaderCell>
                  <TableHeaderCell>Code</TableHeaderCell>
                  <TableHeaderCell>Color</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {colors.map(color => (
                  <TableRow key={color.id} className="group">
                    <TableCell>
                      #{color.id.split("-")[0]}
                    </TableCell>
                    <TableCell>
                      {color.label}
                    </TableCell>
                    <TableCell>
                      {color.code}
                    </TableCell>
                    <TableCell>
                      <div 
                        className="size-6 rounded-full shadow"
                        style={{
                          backgroundColor: color.code
                        }}
                      ></div>
                    </TableCell>
                    <TableCell>
                      <Options
                        uriShow={`/dashboard/colors/${color.id}`}
                        uriEdit={`/dashboard/colors/edit/${color.id}`}
                        id={color.id}
                        callback={deleteColor}
                        title="Delete color"
                        message="Are you sure to remove this color? This action isn't reversible."
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableRoot>
        ) : (
          <p className="text-gray-500">No colors have been created yet, {" "}
            <Link
              href={"/dashboard/sizes/new"}
              className="text-blue-500 hover:underline underline-offset-4 decoration-blue-500"
            >start by creating one.</Link>
          </p>
        )}
      </>
    );
  }