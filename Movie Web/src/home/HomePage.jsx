import React, { useState, useEffect, useRef } from "react"
import Homes from "../components/homes/Homes"
import Trending from "../components/trending/Trending"
import Upcomming from "../components/upcoming/Upcomming"
import { latest, recommended, upcome, cinema } from "../dummyData"
import axios from "axios"
import { Toast } from 'primereact/toast';
import { oauthService } from "../services/oauthService.js"

const HomePage = () => {
  const [items, setItems] = useState(upcome)
  const [item, setItem] = useState(latest)
  const [itemCi, setItemCi] = useState(cinema)
  const [rec, setRec] = useState(recommended)
  const [scrollPosition, setscrollPosition] = useState()
  const [token, setToken] = useState()
  const toastBR = useRef(null);

  const showBottomRight = (message) => {
    toastBR.current.show({ severity: 'success', summary: '', detail: message, life: 2000 });
  }
  const showBottomRightErr = (message) => {
    toastBR.current.show({ severity: 'error', summary: '', detail: message, life: 2000 });
  }

  const handleScroll = () => {
    // Lấy vị trí cuộn hiện tại (scroll position)
    setscrollPosition(window.scrollY);
    // Xử lý sự kiện cuộn chuột (ví dụ: in ra vị trí cuộn)    
  };

  const updateToken = () => {
    if (token != localStorage.getItem('authToken') && localStorage.getItem('authToken') != null) {
      setToken(localStorage.getItem('authToken'))
      getMovieRCMByToken()
    }
    if (token == null) {
      setRec(recommended)
    }
  }

  const getMovieRCMByToken = async () => {
    if (localStorage.getItem('authToken') != null) {
      oauthService.getDataMoviePred(localStorage.getItem('userId')).then(res => {
        if (res.status == 200) {
          processTopMovies(res)
        }
      })


      oauthService.getDataMovie(token).then(res => {
        if (res.status == 200) {
          showBottomRight(res?.data.message)

          const data1 = res?.data.data;
          const transformedData = data1.map(item => ({
            id: item.film_id,
            cover: `../images/rec/${item.film_id}.jpg`,
            name: item.film_name,
            time: "4hr : 28mins"
          }));

          if (token != null)
            setRec(transformedData)
          else
            setRec(recommended)
        }
        else {
          if (res?.data?.message)
            showBottomRightErr(res?.data?.message)
          else
            showBottomRightErr("Get rcm movie fail")
        }
      })
    }
  }

  useEffect(() => {
    // Thêm trình lắng nghe sự kiện cuộn chuột khi component được mount
    window.addEventListener('scroll', handleScroll);
    updateToken()
    // Gỡ bỏ trình lắng nghe sự kiện cuộn chuột khi component được unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);


  const processTopMovies = async (res) => {
    try {
      // Lấy mảng film_id và predictions từ res.data.data
      const { movie } = res?.data?.data;
      const film_ids = movie.movie_id;
      const predictions = movie.predictions;

      // Kết hợp film_id và predictions thành mảng các đối tượng
      const filmsWithPredictions = film_ids.map((film_id, index) => ({
        film_id,
        prediction: predictions[index]
      }));

      filmsWithPredictions.sort((a, b) => b.prediction - a.prediction);

      const top50FilmIds = filmsWithPredictions.slice(0, 50).map(film => film.film_id);

      const detailMoviePromises = top50FilmIds.map(film_id =>
        oauthService.getDetailMovie(film_id)
      );
      const movieDetailsResponses = await Promise.all(detailMoviePromises);

      // Tổng hợp kết quả thành transformedData
      const transformedData = movieDetailsResponses.map((response, index) => {
        const movieDetails = response.data;
        return {
          id: top50FilmIds[index],
          cover: `../images/rec/${top50FilmIds[index]}.jpg`,
          name: movieDetails.name,
          time: "4hr : 28mins",

        };
      });


      return transformedData;
    } catch (error) {

      console.error('Error processing top movies:', error);
      return [];
    }
  };

  return (
    <>
      <Toast ref={toastBR} position="bottom-right" />
      <Homes />
      <Upcomming items={items} title='Upcomming Movies' />
      <Upcomming items={item} title='Latest Movies' />
      <Upcomming items={itemCi} title='Cinema Movies' />
      <Trending />
      <Upcomming items={rec} title='Recommended Movies' />

    </>
  )
}

export default HomePage
