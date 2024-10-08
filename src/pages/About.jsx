import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function About() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <div className='min-h-[90vh] pt-5 md:pt-10 pb-2 px-6 md:px-28'>
      <h1 className='text-3xl font-semibold mb-3'>About Us</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex facere fuga magni, rem corrupti adipisci quod sequi aspernatur sapiente consequatur vel obcaecati deserunt? Est nulla debitis odio eaque eligendi accusantium vitae optio quod nesciunt mollitia cupiditate, sed, perspiciatis magnam tenetur eveniet, asperiores iure maxime expedita libero molestiae totam animi? Error corporis explicabo natus fugit beatae soluta doloremque quaerat quos architecto non, voluptate neque quasi consequuntur earum distinctio atque at. Illo blanditiis quo, sapiente ab sequi recusandae earum ut sunt eum fuga suscipit quisquam explicabo autem deleniti? In eaque sapiente voluptatem perferendis odio! Iusto, mollitia harum? Possimus, sequi veritatis? Modi natus iusto impedit! Ad nobis at ipsa placeat beatae, quibusdam adipisci aspernatur aliquid in fugiat accusamus qui est consequuntur recusandae corporis saepe delectus, dolorem sed aut consectetur! Animi est excepturi esse hic inventore, harum ipsa odit itaque id obcaecati nobis temporibus. Perferendis nam quibusdam temporibus aut maxime. Laudantium nesciunt molestiae expedita dolor? Vel dolor rerum dolore eaque, unde minus quibusdam ipsa, distinctio cumque voluptas blanditiis quo esse soluta labore repellat, aperiam expedita. Reiciendis maiores, quod sit eum error quia iusto sapiente harum expedita fuga ab repudiandae! Qui consequuntur explicabo laborum expedita vitae minima a inventore omnis reprehenderit possimus, eveniet neque sed accusamus ut ducimus soluta. Et tempora nam repudiandae qui quasi nesciunt. Quasi ab ex rerum sed aspernatur laudantium dignissimos voluptate, mollitia quia animi, magnam doloribus perferendis? Expedita dolorem sit debitis, rerum odit at laudantium nulla minus quas sapiente, dolore aliquam voluptatibus eos modi doloremque ducimus ut impedit sequi animi sunt hic earum. Natus praesentium atque blanditiis dicta eum impedit cumque veritatis fuga! A, animi ipsam necessitatibus assumenda voluptate ullam minus commodi adipisci repudiandae quibusdam, quidem magni et maiores quae dolore maxime. Et recusandae voluptate fuga, eos eaque cum aut alias natus, excepturi facilis quaerat repellat, fugiat dolores. Temporibus asperiores, maiores ipsum veniam debitis nobis iure reiciendis eaque excepturi autem ut minus sequi possimus natus magni, rerum, earum delectus sint amet. Nemo, iure cum obcaecati id tempore doloremque architecto eveniet reprehenderit minus voluptate magnam dolorum voluptatem culpa molestias atque quis qui vel sunt ipsam esse officiis quasi. Quasi expedita quo illo, inventore harum non iste rerum voluptas cum, eos ex ab. Laboriosam perspiciatis vel nisi corrupti! Optio sint voluptatum corrupti atque, sequi consectetur consequuntur maiores necessitatibus sapiente explicabo architecto illum quos laborum, quia dignissimos alias saepe perferendis. Voluptate, esse qui rem enim similique, quod dolorem sequi autem libero officia animi eius.</p>
    </div>
  )
}

export default About
