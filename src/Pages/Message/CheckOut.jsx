import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CiCircleInfo } from 'react-icons/ci';
import { GrDocumentZip } from 'react-icons/gr';
import Images from '../../assets/Images';


const CheckOut = () => {
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const validationSchema = Yup.object({
        cardNumber: Yup.string()
            .matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Invalid card number format')
            .required('Card number is required'),
        expirationDate: Yup.string()
            .matches(/^\d{2}\/\d{2}$/, 'Invalid date format (MM/YY)')
            .required('Expiration date is required'),
        securityCode: Yup.string()
            .matches(/^\d{3,4}$/, 'Invalid security code')
            .required('Security code is required'),
        cardholderName: Yup.string().required('Cardholder name is required'),
        displayName: Yup.string(),
        saveCard: Yup.boolean(),
        agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the terms')
    });

    const initialValues = {
        cardNumber: '',
        expirationDate: '',
        securityCode: '',
        cardholderName: '',
        displayName: '',
        saveCard: false,
        agreeTerms: false
    };

     
    const handleSubmit = (values) => {
        console.log('Form submitted:', values);
        setShowSuccessModal(true);
    };


    
    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const handleGoHome = () => {
        setShowSuccessModal(false);
        navigate('/');
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    return (
        <>
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Section - Payment Form */}
                    <div className="lg:col-span-2">
                        <div className="">
                            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                            <div className=' drop-shadow-lg bg-white   rounded-lg '>

                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ values, setFieldValue, errors, touched }) => (
                                        <Form className="space-y-6">
                                            {/* Payment Method Selection */}
                                            <div className="space-y-4 shadow-sm px-6 py-3">
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        id="card"
                                                        name="paymentMethod"
                                                        checked={selectedPayment === 'card'}
                                                        onChange={() => setSelectedPayment('card')}
                                                        className="w-4 h-4 text-blue-600"
                                                    />
                                                    <label htmlFor="card" className="text-sm font-medium">
                                                        Credit & Debit Cards
                                                    </label>
                                                    <div className="flex space-x-2 ml-4">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                                        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Rupay-Logo.png/640px-Rupay-Logo.png" alt="RuPay" className="h-6" /> */}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card Details */}
                                            {selectedPayment === 'card' && (
                                                <div className="space-y-4 px-6">
                                                    {/* Card Number */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Card Number
                                                        </label>
                                                        <Field name="cardNumber">
                                                            {({ field }) => (
                                                                <input
                                                                    {...field}
                                                                    type="text"
                                                                    placeholder="1234 5678 9012 3456"
                                                                    maxLength="19"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    onChange={(e) => {
                                                                        const formatted = formatCardNumber(e.target.value);
                                                                        setFieldValue('cardNumber', formatted);
                                                                    }}
                                                                />
                                                            )}
                                                        </Field>
                                                        <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-sm mt-1" />
                                                    </div>

                                                    {/* Expiration Date and Security Code */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Expiration date
                                                            </label>
                                                            <Field
                                                                name="expirationDate"
                                                                type="text"
                                                                placeholder="MM / YY"
                                                                maxLength="5"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                onChange={(e) => {
                                                                    let value = e.target.value.replace(/\D/g, '');
                                                                    if (value.length >= 2) {
                                                                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                                                                    }
                                                                    setFieldValue('expirationDate', value);
                                                                }}
                                                            />
                                                            <ErrorMessage name="expirationDate" component="div" className="text-red-500 text-sm mt-1" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Security code
                                                            </label>
                                                            <Field
                                                                name="securityCode"
                                                                type="text"
                                                                placeholder="123"
                                                                maxLength="4"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />
                                                            <ErrorMessage name="securityCode" component="div" className="text-red-500 text-sm mt-1" />
                                                        </div>
                                                    </div>

                                                    {/* Cardholder's Name */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Cardholder's name
                                                        </label>
                                                        <Field
                                                            name="cardholderName"
                                                            type="text"
                                                            placeholder="First Last"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        <ErrorMessage name="cardholderName" component="div" className="text-red-500 text-sm mt-1" />
                                                    </div>

                                                    {/* Card Display Name */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Card display name (Optional)
                                                        </label>
                                                        <Field
                                                            name="displayName"
                                                            type="text"
                                                            placeholder="e.g. Marketing credit card team card..."
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        <div className="text-right text-xs text-gray-500 mt-1">0/50</div>
                                                    </div>

                                                    {/* Save Card Checkbox */}
                                                    <div className="flex items-center ">
                                                        <Field
                                                            name="saveCard"
                                                            type="checkbox"
                                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        />
                                                        <label className="ml-2 text-sm text-gray-700">
                                                            Save this card for future payments
                                                        </label>
                                                    </div>
                                                </div>
                                            )}

                                            {/* PayPal Option */}
                                            <div className="flex items-center pb-4 space-x-2 px-6">
                                                <input
                                                    type="radio"
                                                    id="paypal"
                                                    name="paymentMethod"
                                                    checked={selectedPayment === 'paypal'}
                                                    onChange={() => setSelectedPayment('paypal')}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                {/* <label htmlFor="paypal" className="text-sm font-medium">
                        PayPal
                      </label> */}
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                                            </div>




                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            {/* Billing Information */}
                            <div className="  pt-6">
                                <div className="flex items-center justify-start gap-2 mb-4">
                                    <h3 className="text-lg font-semibold">Billing Information</h3>
                                    <CiCircleInfo />
                                    <button type="button" className="underline text-sm">Edit</button>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>developer@phanom.com</p>
                                    <p>Chandigarh, India</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Section - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg drop-shadow-lg p-6 sticky top-20">
                            {/* Promotional Banner */}
                            <div className="mb-6">
                                <div className='flex justify-between gap-2'>

                                <img
                                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop"
                                    alt="Leave Your Fulltime Job"
                                    className="w-[50%] h-20 object-cover rounded-lg"
                                />    
                                <p className="text-md text-gray-600">A responsive web Admin Panel built with React</p>

                                </div>
                                <div className="mt-2 space-y-2">
                                    <div className='flex'>

                                    <p className="text-md text-gray-600">A responsive web Admin Panel built with React</p>
                                    {/* <p className="text-xs text-gray-600">Layout</p> */}
                                    <p className="text-sm text-gray-600 font-medium">₹83,746.62</p>
                                    </div>
                                    <div className='flex justify-between'>
                                    <p className="text-sm text-gray-500">M1 fee</p>
                                      <p className='text-sm text-gray-500"'>15000</p>
                                    </div>
                                    <div className='flex justify-between'>
                                    <p className="text-sm text-gray-500">Phanom service (10%)</p>
                                      <p className='text-sm text-gray-500"'>50</p>
                                    </div>
                                    <div className='flex justify-between'>
                                    <p className="text-sm text-gray-500">GST</p>
                                      <p className='text-sm text-gray-500"'>200</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Details */}
                            {/* <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span>Responsive</span>
                                    <span>UI Design</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>UX</span>
                                    <span></span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Approval</span>
                                    <span>Admin Panel</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>UI Design</span>
                                    <span></span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Admin" className="w-6 h-6 rounded-full mr-2" />
                                    <span>Himas Admin Panel.zip</span>
                                </div>
                            </div> */}

                            {/* <div className='flex flex-wrap gap-3 '>
                                <div className='bg-[#F4F6FA] w-fit px-2 py-1 text-center rounded-xl font-semibold text-[13px]'>RESPONSIVE </div>
                                <div className='bg-[#F4F6FA] w-fit px-2 py-1 text-center rounded-xl font-semibold text-[13px]'>UI DESIGN</div>
                                <div className='bg-[#F4F6FA] w-fit px-2 py-1 text-center rounded-xl font-semibold text-[13px]'>UX DESIGN</div>
                                <div className='bg-[#F4F6FA] w-fit px-2 py-1 text-center rounded-xl font-semibold text-[13px]'>LARAVEL</div>
                                <div className='bg-[#F4F6FA] w-fit px-2 py-1 text-center rounded-xl font-semibold text-[13px]'>ADMIN PANEL</div>
                                <div className='bg-[#F4F6FA] w-fit px-2 py-1 text-center rounded-xl font-semibold text-[13px]'>ECOMMERCE</div>
                                <div className='bg-[#F4F6FA] w-fit px-2 py-1 text-center rounded-xl font-semibold text-[13px]'>eccomervce</div>
                            </div> */}

                            {/* <div className='flex items-center gap-3 bg-[#F4F6FA] w-full p-2 text-start rounded-xl text-[18px] my-4'><GrDocumentZip/>HRMS Admin Panel.zip</div> */}


                            {/* Total */}
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between text-gray-600 text-lg font-semibold mb-4">
                                    <span>Total</span>
                                    <span>₹83,746.62</span>
                                </div>
                                 <div className='flex justify-between'>
                                    <p className="text-sm text-gray-500">Image Type</p>
                                      <p className='text-sm text-gray-500"'>JPG</p>
                                    </div>
                                <p className="text-xs text-gray-600 my-4">
                                    Hiring Phanom Manager <span className='text-blue-400 underline cursor-pointer'>See Details</span>
                                </p>
                            </div>

                            {/* Terms Agreement */}
                            <div className="flex items-start space-x-2 pb-4">
                                <input
                                    name="agreeTerms"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                                />
                                <label className="text-sm text-gray-700">
                                    By Clicking The Button, You Agree To Phantom's <span className='underline'>Terms of Service</span>  And <span className='underline'>Privacy Policy.</span>
                                </label>
                            </div>
                            {/* <ErrorMessage name="agreeTerms" component="div" className="text-red-500 text-sm" /> */}

                            {/* Submit Button */}
                            <button
                                // onClick={setShowSuccessModal(true)}
                                className="w-full bg-gradient-to-r from-[#459CE1] to-[#D11AE7] text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors"
                            >
                                Confirm & Pay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
            {/* Payment Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
                        <h2 className="text-2xl font-bold mb-4">Payment Successful</h2>
                        
                        <p className="text-gray-600 mb-6">
                            Your Project Files Will Be Sent To Your Registered Email Address:
                            <br />
                            <span className="text-blue-600">Usermail@example.Com</span>
                        </p>

                        <div className="mb-6">
                            <img 
                                src={Images.PaymentSuccessful} 
                                alt="Payment Successful" 
                                className="w-48 h-32 mx-auto object-contain"
                            />
                        </div>

                        <p className="text-gray-500 text-sm mb-6">
                            If You Do Not Receive The Email Within A Few Minutes, Contact Our
                            <br />
                            Support Team For Assistance.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={handleCloseModal}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleGoHome}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                            >
                                Home
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CheckOut;

