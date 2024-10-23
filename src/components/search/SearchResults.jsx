import React from "react";
import { ResultCard } from "./ResultCard";

export const SearchResults = ({ items, type }) => {
    if (!items?.length) {
        return (
            <div className="text-center text-gray-500 py-8">
                No {type} found
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items.map((item) => (
                <ResultCard key={item.id} item={item} type={type} />
            ))}
        </div>
    );
};
