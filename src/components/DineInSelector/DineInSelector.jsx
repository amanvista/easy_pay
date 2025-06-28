import { useState, useMemo } from "react";
import { Image as ImageIcon, Camera } from "lucide-react";
import Modal from "../Modal/Modal";

const mockTables = [
  { id: "T1", x: 0, y: 0, capacity: 2 },
  { id: "T2", x: 2, y: 0, capacity: 2 },
  { id: "T3", x: 1, y: 1, capacity: 4 },
  { id: "T4", x: 0, y: 2, capacity: 6 },
  { id: "T5", x: 2, y: 2, capacity: 10 },
];

const DineInSelector = ({ selectedTable, setSelectedTable }) => {
  const [step, setStep] = useState("members"); // members | table | time
  const [memberCount, setMemberCount] = useState(null);
  const [timeSlot, setTimeSlot] = useState(null);

  const [showLayout, setShowLayout] = useState(false);
  const [showAmbience, setShowAmbience] = useState(false);

  const gridSize = useMemo(() => {
    const maxX = Math.max(...mockTables.map((t) => t.x));
    const maxY = Math.max(...mockTables.map((t) => t.y));
    return { cols: maxX + 1, rows: maxY + 1 };
  }, []);

  const resetFlow = () => {
    setStep("members");
    setMemberCount(null);
    setSelectedTable(null);
    setTimeSlot(null);
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Back Button */}
      {step !== "members" && (
        <button
          onClick={() => {
            if (step === "table") {
              setStep("members");
              setMemberCount(null);
              setSelectedTable(null);
            } else if (step === "time") {
              setStep("table");
              setSelectedTable(null);
              setTimeSlot(null);
            }
          }}
          className="text-sm text-orange-600 font-semibold mb-2"
        >
          ← Back
        </button>
      )}

      {/* Step 1: Member Count */}
      {step === "members" && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Select Number of Members
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[...Array(20)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setMemberCount(i + 1);
                  setStep("table");
                }}
                className="py-2 rounded-lg border text-sm hover:bg-gray-100"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Table Preference */}
      {step === "table" && memberCount && (
        <button
          onClick={() => setShowLayout(true)}
          className="w-full text-left bg-white border p-3 rounded-xl flex justify-between items-center text-sm font-medium"
        >
          {selectedTable
            ? `Preference: ${selectedTable}`
            : "Select Your Preference"}
          <ImageIcon size={16} className="text-orange-500" />
        </button>
      )}

      {/* Modal with Table Layout and Time Slot */}
      {showLayout && (
        <Modal onClose={() => setShowLayout(false)}>
          <div className="space-y-4 px-2 sm:px-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold">
                {step === "table"
                  ? "Select Your Preference"
                  : "Choose Time Slot"}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Subject to availability
              </p>
            </div>

            {/* Seating Layout */}
            {step === "table" && (
              <>
                <div
                  className="relative bg-gray-50 border rounded-lg p-4 mx-auto"
                  style={{
                    width: `${gridSize.cols * 80}px`,
                    height: `${gridSize.rows * 80}px`,
                    display: "grid",
                    gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
                    gap: "12px",
                  }}
                >
                  {[...Array(gridSize.rows)].map((_, y) =>
                    [...Array(gridSize.cols)].map((_, x) => {
                      const table = mockTables.find(
                        (t) => t.x === x && t.y === y
                      );
                      const isDisabled = table && table.capacity < memberCount;

                      return (
                        <div
                          key={`${x}-${y}`}
                          className="flex justify-center items-center"
                        >
                          {table ? (
                            <button
                              disabled={isDisabled}
                              onClick={() => {
                                if (!isDisabled) {
                                  setSelectedTable(table.id);
                                  setStep("time");
                                }
                              }}
                              className={`w-16 h-16 rounded-xl text-sm font-medium border transition ${
                                isDisabled
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                                  : selectedTable === table.id
                                  ? "bg-orange-500 text-white border-orange-500"
                                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                              }`}
                            >
                              {table.id}
                            </button>
                          ) : (
                            <div className="w-16 h-16" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                <button
                  onClick={() => setShowAmbience(true)}
                  className="w-full mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-orange-500 border-2 border-orange-600 rounded-2xl px-4 py-2 cursor-pointer hover:bg-orange-600 active:scale-95 transition"
                >
                  <Camera size={16} className="text-white" />
                  View Restaurant Ambience
                </button>
              </>
            )}

            {/* Step 3: Time Slot */}
            {step === "time" && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Select Time Slot</h3>
                <div className="grid grid-cols-3 gap-2">
                  {["12:00 PM", "1:30 PM", "3:00 PM", "6:00 PM", "8:00 PM"].map(
                    (slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setTimeSlot(slot);
                          setShowLayout(false); // Close modal
                        }}
                        className={`py-2 px-3 rounded-lg border text-sm hover:bg-gray-100 ${
                          timeSlot === slot
                            ? "bg-orange-500 text-white border-orange-500"
                            : ""
                        }`}
                      >
                        {slot}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
              <strong>Note:</strong> This is a visual representation to help you
              choose your seating preference. Final seating is subject to
              availability.
            </p>
          </div>
        </Modal>
      )}

      {/* Ambience Modal */}
      {showAmbience && (
        <Modal onClose={() => setShowAmbience(false)}>
          <img
            src="https://static.wixstatic.com/media/bbc2f7_45efc10174c04a14b4192c964da4922e~mv2.jpg/v1/fill/w_640,h_442,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/bbc2f7_45efc10174c04a14b4192c964da4922e~mv2.jpg"
            alt="Restaurant Ambience"
            className="rounded-xl max-w-full"
          />
        </Modal>
      )}

      {/* Final Summary and CTA */}
      {selectedTable && timeSlot && (
        <div className="mt-4 space-y-1 text-sm">
          <p>
            <strong>Table:</strong> {selectedTable}
          </p>
          <p>
            <strong>Time Slot:</strong> {timeSlot}
          </p>
          <p
            onClick={() => {
              const el = document.querySelector("#bill_details");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="block text-center text-sm text-orange-600 font-semibold underline cursor-pointer mt-3"
          >
            View Bill Summary
          </p>
        </div>
      )}

      {/* Reset Option */}
      {(selectedTable || timeSlot || memberCount) && (
        <button
          onClick={resetFlow}
          className="w-full text-xs text-gray-400 underline mt-2"
        >
          Reset Selection
        </button>
      )}
    </div>
  );
};

export default DineInSelector;
