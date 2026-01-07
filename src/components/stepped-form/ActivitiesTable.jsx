import React from "react";
import { Button } from "../ui/button";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
export default function ActivitiesTable({ rows, setRows }) {

  function addRow() {
    setRows([...rows, { name: "", description: "", impacts: [], impactDescription: "" }]);
  }

  function updateCell(rowIndex, field, value) {
    const next = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [field]: value };
      }
      return row;
    });

    setRows(next);
  }

  function removeRow(rowIndex) {
    setRows(rows.filter((_, index) => index !== rowIndex));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Activities</h2>
        <Button
          onClick={addRow}
          className="px-3 py-2 rounded border"
        >
          + Add activity
        </Button>
      </div>

      <div className="overflow-x-auto border-2 rounded-lg  shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="text-left p-3 w-[220px]">Activity name</th>
              <th className="text-left p-3">Process description</th>
              <th className="p-3 w-[90px]"></th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr className = "text-center">
                <td className="p-3 text-gray-500" colSpan={3}>
                  No activities yet. Click “Add activity”.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3 align-top">
                    <Input
                      className="w-full border rounded px-2 py-1"
                      value={row.name}
                      onChange={(e) =>
                        updateCell(idx, "name", e.target.value)
                      }
                      placeholder="e.g., Customer Support"
                    />
                  </td>

                  <td className="p-3 align-top">
                    <Textarea
                      className="w-full border rounded px-2 py-1 "
                      value={row.description}
                      onChange={(e) =>
                        updateCell(idx, "description", e.target.value)
                      }
                      placeholder="Describe processes..."
                    />
                  </td>

                  <td className="p-3 align-top text-right">
                    <Button
                      
                      variant= "outline"
                      onClick={() => removeRow(idx)}
                      className="px-3 py-2 rounded border"
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
