import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import upload from "../../assets/upload.svg";

const Supports = () => {
  const initialValues = {
    name: "",
    subject: "",
    file: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    subject: Yup.string().required("Description is required"),
    file: Yup.mixed().required("File is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form data:", values);
    resetForm();
  };

  return (
    <div className="p-5">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">Supports</h2>

      <div className="bg-white rounded-lg p-5 shadow-md mt-4">
        <h3 className="text-lg md:text-xl font-medium capitalize mb-3">
          Customer Support
        </h3>
        <p className="text-sm md:text-base text-[#6F6F6F] mb-2 leading-6">
          Deliver Seamless Assistance And Improve User Experience.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="flex flex-col gap-5 mt-6">
              {/* Row 1 */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Name */}
                <div className="flex flex-col flex-1">
                  <label htmlFor="name" className="text-sm md:text-base mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="p-3 border border-gray-300 rounded-lg text-sm"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="subject"
                    className="text-sm md:text-base mb-1"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="textarea"
                    id="subject"
                    name="subject"
                    placeholder="Write Description..."
                    className="p-3 border border-gray-300 rounded-lg text-sm min-h-[50px]"
                  />
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              {/* Upload Section */}
              <div className="flex flex-col w-full md:w-1/2">
                <label className="text-sm md:text-base mb-1">
                  Upload Attachment <span className="text-red-500">*</span>
                </label>
                <div className="relative border border-gray-300 rounded-md px-4 py-3 bg-white text-sm text-gray-500 flex items-center justify-between cursor-pointer">
                  <span>Upload File</span>
                  <img src={upload} alt="Upload Icon" className="w-5 h-5" />
                  <input
                    type="file"
                    name="file"
                    onChange={(event) =>
                      setFieldValue("file", event.currentTarget.files[0])
                    }
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <ErrorMessage
                  name="file"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-[#8F8F8F] rounded-lg text-sm bg-white shadow-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white rounded-lg bg-gradient-to-r from-[#459CE1] to-[#D11AE7] hover:opacity-90"
                >
                  Send
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Supports;
