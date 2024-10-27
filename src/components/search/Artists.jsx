import { Music } from "lucide-react";
import Carousel from "../utils/Carousel";
import { useNavigate } from "react-router-dom";

export const Artists = ({ artists = [] }) => {
    const navigate = useNavigate();

    if (!artists.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Music className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-400">No artists found</p>
            </div>
        );
    }


  return (
    <div className="px-4">
      <Carousel title="Artists">
        {artists.map((artist) => (
          <div key={artist.id} className="flex-none w-48 md:w-56">
            <div
              className="flex flex-col items-center p-6 rounded-xl 
                         bg-gray-800/30 hover:bg-gray-800/50 
                         transition-all duration-300 transform hover:scale-105
                         shadow-lg hover:shadow-xl"
                            onClick={() => {
                                navigate(`/artist/${artist.id}`);
                            }}
                        >
                            <div
                                className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-800
                              ring-4 ring-gray-700/50 hover:ring-gray-600
                              transition-all duration-300"
              >
                {artist.image ? (
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover hover:scale-105 
                               transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              <h3 className="text-white font-bold text-center truncate w-full text-sm">
                {artist.name}
              </h3>
              <p className="text-gray-400 text-xs mt-1">Artist</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
