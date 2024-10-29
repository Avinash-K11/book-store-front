import { Swiper, SwiperSlide } from "swiper/react"; //swiper modules
import { Pagination, Navigation } from "swiper/modules"; //required modules

import BookCard from "./BookCard";
import { useFetchAllBooksQuery } from "../redux/features/books/booksAPI";

//swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Recommendation = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  return (
    <div className="py-16">
      <h1 className="text-3xl font-semibold mb-6">Recommended For You</h1>

      <Swiper
        navigation={true}
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1080: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {books.length > 0 &&
          books.slice(8, 16).map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Recommendation;
