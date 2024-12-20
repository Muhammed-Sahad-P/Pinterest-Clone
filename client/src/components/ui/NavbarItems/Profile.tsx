// import React from "react";
// // import { useSelector } from "react-redux";
// // import { RootState } from "@/lib/store";

// export default function Profile() {
//     // const { user, loading, error } = useSelector((state: RootState) => state.user);

//     // if (loading) {
//     //     return <div>Loading...</div>;
//     // }

//     // if (error) {
//     //     return <div className="text-red-500">{error}</div>;
//     // }

//     return (
//         <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-md">
//             <h1 className="text-2xl font-semibold text-center">Profile</h1>
//             <div className="mt-6">
//                 <h2 className="text-xl font-medium">User Information</h2>
//                 <div className="mt-4 space-y-2">
//                     <p>
//                         <strong>Name:</strong> {user?.name || "Not available"}
//                     </p>
//                     <p>
//                         <strong>Email:</strong> {user?.email || "Not available"}
//                     </p>
//                     {/* Add more fields as needed */}
//                 </div>
//             </div>

//             {/* Edit Profile Button */}
//             <div className="mt-6 text-center">
//                 <button
//                     onClick={() => alert("Redirect to Edit Profile Page")}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
//                 >
//                     Edit Profile
//                 </button>
//             </div>

//             {/* Change Password Button */}
//             <div className="mt-4 text-center">
//                 <button
//                     onClick={() => alert("Redirect to Change Password Page")}
//                     className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-all duration-300"
//                 >
//                     Change Password
//                 </button>
//             </div>

//             {/* Logout Button */}
//             <div className="mt-4 text-center">
//                 <button
//                     onClick={() => alert("Log out logic here")}
//                     className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
//                 >
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// }
