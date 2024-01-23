import { useEffect, useRef, useState } from 'react'
import './App.css'
import banner_Akatsuki from './assets/imagens/rap-akatsuki.jpg'
import banner_Sukuna from './assets/imagens/rap-sukuna.jpg'
import banner_Gon from './assets/imagens/rap-gon.jpg'
import Rap_Akatsuki from './assets/musicas/Rap-da-Akatsuki.mp3'
import Rap_Sukuna from './assets/musicas/rap-sukuna-M4rkim.mp3'
import Rap_Gon from './assets/musicas/Rap-do-Gon.mp3'
import {TbPlayerSkipBackFilled} from 'react-icons/tb'
import {TbPlayerPauseFilled} from 'react-icons/tb'
import {TbPlayerSkipForwardFilled} from 'react-icons/tb'
import {TbPlayerPlayFilled} from 'react-icons/tb'


const converterParaMinutosESegundos = (valor: number | undefined) => {
  let minutos
  let segundos
  let minutosValor 
  let segundosValor
  if(valor){
      valor = Math.floor(valor)
      minutos = Math.floor(valor / 60)
      segundos = Math.floor(valor - minutos  * 60)
      minutosValor = minutos.toString().padStart(2,'0')
      segundosValor = segundos.toString().padStart(2, '0')
  }

   
 
  const tempo = minutosValor === undefined && segundosValor === undefined ? '00:00' : `${minutosValor}:${segundosValor}`
  
  return tempo
  
}




function App() {
   const audio = useRef<HTMLAudioElement>(null)
   const barraDeProgresso = useRef<HTMLProgressElement>(null)
   const [tocando, setTocando] = useState(false)
   const [index, setIndex] = useState(0)
   const [tempoAtual, setTempoAtual] = useState<number>()
   const [duracao, setDuracao] = useState<number>()

   const [musicas, setMusicas] = useState([
     {
       nome: 'Rap da Akatsuki - OS NINJAS MAIS PROCURADOS',
       artista: '7 Minutoz',
       musica: Rap_Akatsuki,
       bannerMusica: banner_Akatsuki,
     },
     {
      nome: 'Sukuna - Rei Das Maldições',
      artista: 'M4rkim',
      musica: Rap_Sukuna,
      bannerMusica: banner_Sukuna,
    },
    {
      nome: 'Rap do Gon - Hunter x Hunter',
      artista: 'Tauz',
      musica: Rap_Gon,
      bannerMusica: banner_Gon,
    },
   ])

 

   
    const TocarMusica = () => {
      if(tocando){
        audio.current?.pause()
      }else{
        audio.current?.play()
      }
      setTocando(!tocando)


  
      
    }



    const TrocarMusica = (tipo: string) => {
       if(tipo === 'proximo'){
         if(index >= musicas.length - 1){
            setIndex(0)
           
         }else{
            setIndex(index + 1)
          
         }

      
        
      
       }else if (tipo === 'voltar'){
          if(index <= 0){
            setIndex(musicas.length - 1)
          }else{
            setIndex(index - 1)
          }
        
          
       }


       
    }


    useEffect(() => {
      if(tocando){
        audio.current?.play()
      }
       
    }, [index,tocando])


    const atualizarTempoAtual:React.ReactEventHandler<HTMLAudioElement> = (event) => {
      setTempoAtual(audio.current?.currentTime)
      setDuracao(audio.current?.duration)
     
    }

    const AvancarMusicaManualmente: React.MouseEventHandler<HTMLProgressElement> = (event) => {
        if(barraDeProgresso.current && audio.current){
           const x = event.pageX - barraDeProgresso.current.offsetLeft
           audio.current.currentTime = audio.current.duration * x / barraDeProgresso.current.offsetWidth
        }

    }

  return (
    <div className='flex justify-center items-center py-10'>
       <div className='w-full max-w-[450px] px-9 pt-9 h-[580px] bg-violet-800'>
               <img className='w-[300px] mx-auto mb-3' src={musicas[index].bannerMusica} alt='imagem da musica'/>
               <div className='text-center text-white'>
                   <h1 className='font-bold'>{musicas[index].nome}</h1>
                   <h2 className='font-normal'>{musicas[index].artista}</h2>
               </div>
               <audio src={musicas[index].musica} ref={audio} onTimeUpdate={atualizarTempoAtual}></audio>
               <progress ref={barraDeProgresso} className='w-full h-[7px]  rounded-[20px] overflow-hidden' id="file" value={tempoAtual} max={duracao} onClick={AvancarMusicaManualmente}></progress>

               <div className='flex justify-between text-white'>
                  <span>{converterParaMinutosESegundos(tempoAtual)}</span>
                  <span>{converterParaMinutosESegundos(duracao)}</span>
               </div>

               <div className='flex justify-center items-center gap-3 mt-3'>
                  <TbPlayerSkipBackFilled className='text-white text-[35px] cursor-pointer' onClick={() => TrocarMusica('voltar')}/>
                  {tocando ?  
                  <TbPlayerPauseFilled 
                  className='text-white text-[70px] cursor-pointer' 
                  onClick={TocarMusica}/>
                  : 
                  <TbPlayerPlayFilled
                   className='text-white text-[70px] cursor-pointer' 
                   onClick={TocarMusica}/>
                  }
                  <TbPlayerSkipForwardFilled className='text-white text-[35px] cursor-pointer' onClick={() => TrocarMusica('proximo')}/> 
               </div>

              
       </div>
    </div>
  )
}

export default App
