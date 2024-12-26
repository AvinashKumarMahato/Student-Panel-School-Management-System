import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const UserClass = () => {
    const { classes, getAllClasses} = useContext(AppContext);
    const [selectedFilter, setSelectedFilter] = useState('ALL');
    const classFilters = ['ALL', 'CLASS 1', 'CLASS 2', 'CLASS 3', 'CLASS 4', 'CLASS 5', 'CLASS 6', 'CLASS 7', 'CLASS 8', 'CLASS 9', 'CLASS 10'];

    useEffect(() => {
        getAllClasses();
    }, []);

    const filteredClasses = classes.filter(classItem => {
        if (selectedFilter === 'ALL') return true;
        return classItem.selectedClass === selectedFilter;
    });

    return (
        <div className="px-4 sm:px-8 lg:px-16 py-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Classes</h1>
            
            {/* Class Filters */}
            <div className="mb-6 flex flex-wrap gap-2">
                {classFilters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`px-4 py-2 rounded-full text-sm ${
                            selectedFilter === filter 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.map((classItem) => (
                    <div key={classItem._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <div className="flex items-start gap-4">
                            <img 
                                src={classItem.teacherData.image} 
                                alt={classItem.teacherData.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                    {classItem.teacherData.name}
                                    <img src={assets.verified_icon} alt="verified" className="w-4 h-4" />
                                </h3>
                                <p className="text-sm text-gray-600">{classItem.teacherData.expert}</p>
                                <p className="text-sm text-gray-600">{classItem.selectedClass}</p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <p className="text-sm text-gray-700">
                                <span className="font-medium">Date:</span> {classItem.slotDate.replace(/_/g, '/')}
                            </p>
                            <p className="text-sm text-gray-700">
                                <span className="font-medium">Time:</span> {classItem.slotTime}
                            </p>
                            <p className="text-sm text-gray-700">
                                <span className="font-medium">Status:</span>{' '}
                                <span className={`${
                                    classItem.cancelled ? 'text-red-500' : 
                                    classItem.isCompleted ? 'text-green-500' : 'text-blue-500'
                                }`}>
                                    {classItem.cancelled ? 'Cancelled' : 
                                     classItem.isCompleted ? 'Completed' : 'Scheduled'}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}

                {filteredClasses.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No classes found for the selected filter.
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserClass;