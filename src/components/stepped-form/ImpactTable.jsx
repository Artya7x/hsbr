import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const IMPACT_OPTIONS = [
  "High energy usage",
  "Privacy risk",
  "Data exposure",
  "Safety issue",
  "Financial impact",
  "Environmental impact",
];

export default function ImpactTable({ rows, setRows }) {

  function updateImpacts(rowIndex, newImpacts) {
    const updated = rows.map((row, idx) =>
      idx === rowIndex ? { ...row, impacts: newImpacts } : row
    );

    setRows(updated);
  }

  function toggleImpact(rowIndex, impactName) {
    const activity = rows[rowIndex];
    const exists = activity.impacts.includes(impactName);

    if (exists) {
      updateImpacts(
        rowIndex,
        activity.impacts.filter(i => i !== impactName)
      );
    } else {
      updateImpacts(
        rowIndex,
        [...activity.impacts, impactName]
      );
    }
  }

  function addCustomImpact(rowIndex, customName) {
    const trimmed = customName.trim();
    if (!trimmed) return;

    
    if (!rows[rowIndex].impacts.includes(trimmed)) {
      updateImpacts(rowIndex, [...rows[rowIndex].impacts, trimmed]);
    }
  }

  function updateDescription(rowIndex, newDescription) {
    const updatedRows = rows.map((row, idx) =>
      idx === rowIndex ? { ...row, impactDescription: newDescription } : row
    );
    setRows(updatedRows);
  }

  // Check if there are activties stored and display table 
const hasData = rows.some(
  (row) =>
    row.name.trim() !== "" ||
    row.impacts.length > 0 ||
    (row.impactDescription && row.impactDescription.trim() !== "")
);

  
  return (

    <div className="mt-10 ">
      <h2 className="text-lg font-semibold mb-3">Impacts per Activity</h2>
      

      <div className="overflow-x-auto border-2 rounded-lg  shadow-sm">
          
           
          

        <table className="w-full text-sm">

        
          <thead className="border-b">
            
            <tr>
              <th className="p-3 text-left">Activity</th>
              <th className="p-3 text-left">Select Impacts</th>
              <th className="p-3 w-[260px] text-left">Description</th>
            </tr>
          </thead>

          <tbody>

             {!hasData && (
            <tr><td colSpan="3" className="p-3 text-center"><p className="text-gray-500 italic">No activities added yet.</p></td></tr>
            )}
           {hasData && <>
            {rows.map((activity, idx) => (
              <tr key={idx} className="border-b align-top">
                
               
                <td className="p-3 font-medium w-[220px]">
                  {activity.name || "(Unnamed activity)"}
                </td>

                
                <td className="p-3">
                  <div className="flex flex-wrap gap-2 mb-3">

                    {(() => {
                      const customImpacts = activity.impacts.filter(
                        i => !IMPACT_OPTIONS.includes(i)
                      );

                      const allImpactOptions = [...IMPACT_OPTIONS, ...customImpacts];

                      return allImpactOptions.map(opt => {
                        const selected = activity.impacts.includes(opt);

                        return (
                          <Button
                            key={opt}
                            variant={selected ? "default" : "outline"}
                            className="px-2 py-1 text-xs"
                            onClick={() => toggleImpact(idx, opt)}
                          >
                            {opt}
                          </Button>
                        );
                      });
                    })()}

                  </div>

                  <Input
                    placeholder="Add custom impact"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomImpact(idx, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                </td>
             
                <td className="p-3">
                  <Textarea
                    className="w-full border rounded px-2 py-1 w-[240px] h-[130px]"
                    value={activity.impactDescription}
                    placeholder="Describe the impact of this activity..."
                    onChange={(e) =>
                      updateDescription(idx, e.target.value)
                    }
                  />
                </td>

              </tr>
            ))}
            </>}
          </tbody>
          
        </table> 
        
      </div>
    </div>
  );
}
