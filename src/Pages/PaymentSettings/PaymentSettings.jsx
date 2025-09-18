import { useState } from "react";
import { FaUniversity, FaPaypal } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const PaymentSettings = () => {
  const [activeMethod, setActiveMethod] = useState("bank");

  const initialValues = {
    country: "",
    bic: "",
    address: "",
    city: "",
    state: "",
    accountNumber: "",
    holderName: "",
  };

  const validationSchema = Yup.object({
    country: Yup.string().required("Required"),
    bic: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    accountNumber: Yup.string().required("Required"),
    holderName: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    alert("Payment method saved!");
  };

  return (
    <div className="p-5">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Payment Settings
      </h2>

      <div className="bg-white p-5 rounded-lg shadow-sm mb-8">
        <h3 className="text-[24px] font-medium leading-[30px] capitalize mb-6 ">
          Payout Settings
        </h3>

        {/* Method Switch */}
        <div className="flex gap-3 mb-6">
          {["bank", "paypal"].map((method) => (
            <div
              key={method}
              className={`rounded-[10px] cursor-pointer ${
                activeMethod === method
                  ? "bg-gradient-to-b from-[#4998E0] via-[#9258E4] to-[#CD1CE8] p-[1.5px]"
                  : ""
              }`}
              onClick={() => setActiveMethod(method)}
            >
              <div
                className={`rounded-lg w-[131px] h-[119px] flex flex-col items-center justify-center border border-[#44444423] font-medium transition-all ${
                  activeMethod === method
                    ? "bg-[#E2F1FF]"
                    : "text-[#444]"
                }`}
              >
                {method === "bank" ? (
                  <FaUniversity
                    className={`text-[28px] mb-2 ${
                      activeMethod === method
                        ? "text-[#6C5FD4]"
                        : "text-[#444]"
                    }`}
                  />
                ) : (
                  <FaPaypal
                    className={`text-[28px] mb-2 ${
                      activeMethod === method
                        ? "text-[#6C5FD4]"
                        : "text-[#444]"
                    }`}
                  />
                )}
                <span
                  className={`text-[14px] text-center ${
                    activeMethod === method
                      ? "text-[#6C5FD4]"
                      : "text-[#444]"
                  }`}
                >
                  {method === "bank" ? "Bank Transfer" : "Paypal"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="flex flex-col gap-4">
              {/* Row 1 */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col flex-1">
                  <label className="text-[16px] mb-2">
                    Bank Account<span className="text-red-500 ml-1">*</span>
                  </label>
                  <Field
                    as="select"
                    name="country"
                    className="p-3 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <label className="text-[16px] mb-2">
                    Bank BIC/SWIFT<span className="text-red-500 ml-1">*</span>
                  </label>
                  <Field
                    type="text"
                    name="bic"
                    placeholder="ABCDEFTHQXYZ"
                    className="p-3 border border-gray-300 rounded-lg text-sm"
                  />
                  <ErrorMessage
                    name="bic"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col flex-1">
                  <label className="text-[16px] mb-2">
                    Bank Address<span className="text-red-500 ml-1">*</span>
                  </label>
                  <Field
                    type="text"
                    name="address"
                    placeholder="123, Street, Bihar, India"
                    className="p-3 border border-gray-300 rounded-lg text-sm"
                  />
                  <ErrorMessage
                    name="address"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="text-[16px] mb-2">
                    Bank City<span className="text-red-500 ml-1">*</span>
                  </label>
                  <Field
                    type="text"
                    name="city"
                    placeholder="Bihar"
                    className="p-3 border border-gray-300 rounded-lg text-sm"
                  />
                  <ErrorMessage
                    name="city"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col flex-1">
                  <label className="text-[16px] mb-2">
                    Bank Province/State<span className="text-red-500 ml-1">*</span>
                  </label>
                  <Field
                    as="select"
                    name="state"
                    className="p-3 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="">Select State</option>
                    <option value="California">California</option>
                    <option value="Texas">Texas</option>
                  </Field>
                  <ErrorMessage
                    name="state"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="text-[16px] mb-2">
                    Account Number<span className="text-red-500 ml-1">*</span>
                  </label>
                  <Field
                    type="text"
                    name="accountNumber"
                    placeholder="0000000000"
                    className="p-3 border border-gray-300 rounded-lg text-sm"
                  />
                  <ErrorMessage
                    name="accountNumber"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex flex-col w-full md:w-[49%]">
                <label className="text-[16px] mb-2">
                  Name of Account Holder (as shown on bank statement)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Field
                  type="text"
                  name="holderName"
                  placeholder="Alexander"
                  className="p-3 border border-gray-300 rounded-lg text-sm"
                />
                <ErrorMessage
                  name="holderName"
                  component="span"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 border border-[#8F8F8F] bg-white rounded-lg text-sm shadow-md hover:bg-gray-100"
                >
                  Add Payment
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white rounded-lg bg-gradient-to-r from-[#459CE1] to-[#D11AE7] hover:opacity-90"
                >
                  Add Payment & Activate
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* ---------------- Payment History ---------------- */}
      <div className="bg-white p-5 rounded-lg shadow-sm overflow-x-scroll w-full ">
        <h3 className="text-[24px] font-medium leading-[30px] capitalize mb-4 ">
          Payment History
        </h3>
        <table className="w-full border-collapse text-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="text-[#6F6F6F] text-left">
              <th className="p-3">AMOUNT</th>
              <th className="p-3">PAYOUT METHOD</th>
              <th className="p-3">DATE</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["₹688", "Paypal", "Mar 12, 2025"],
              ["₹720", "Paypal", "Mar 12, 2025"],
              ["₹720", "Bank Transfer", "Mar 12, 2025"],
              ["₹900", "Bank Transfer", "Mar 12, 2025"],
              ["₹900", "Paypal", "Mar 12, 2025"],
            ].map(([amount, method, date], index) => (
              <tr key={index} className="capitalize font-medium">
                <td className="p-3">{amount}</td>
                <td className="p-3">{method}</td>
                <td className="p-3">{date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentSettings;
