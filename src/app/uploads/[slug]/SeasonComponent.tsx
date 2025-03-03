'use client'

import React, { useState } from 'react'
import { ISeason } from './components/UploadComponent'
import Image from 'next/image'
import useToggle from '@/hooks/useToggle';
import { roboto_400, roboto_500 } from '@/config/fonts';
import { AppButton, CustomInput } from '@/components/AppLayout';
import ReactPlayer from 'react-player';
import { truncateText } from '@/utilities/textUtils';
import { LinkViewProps } from '@/types/packages';
import { isValidUrl, normalizeUrl, transformResponse } from '@/utilities/linkUtils';
import { toast } from 'react-toastify';
import { getPreview } from '@/app/server';
import { ImageProps } from '@/app/plans/ClientComponent';
import EpisodeComponent from './components/EpisodeComp';
import { IEpisodeData, ISeasonData } from '@/types/api/content.type';


interface Props {
    season: ISeasonData
    handleFunc?: () => void
}
function SeasonComponent({ season, handleFunc }: Props) {
    const [showSelect, setShowSelect] = useToggle();
    const [isViewEp, setIsViewEp] = useState<string>('');
    const sortedEpisodes = season.episodes.sort((a, b) => a.episodeNumber - b.episodeNumber);
    const emptyEpisode: IEpisodeData = {
        _id: '',
        admin: '',
        season: '',
        episodeNumber: sortedEpisodes[sortedEpisodes.length - 1]?.episodeNumber ?? 0 + 1,
        title: '',
        description: '',
        trailer: '',
        video: ''
    }



    return (
        <div style={{ backfaceVisibility: "hidden" }} className={`relative z-0 overflow-y-hidden ${showSelect && 'h-[65px]'}`}>
            <div className='bg-black3'>
                <div className={`w-full px-10 lg:px-16 flex items-center gap-x-6 ${season.serial_number % 2 !== 0 ? 'bg-black3' : 'bg-[#D9D9D91A]'} py-5 transition-all duration-300 z-[9999999]`}>
                    <button onClick={() => setShowSelect(!showSelect)}>
                        <Image
                            src="/bigDown.svg"
                            width={19}
                            height={13}
                            alt=""
                            className={showSelect ? "-rotate-90 transition-all duration-300" : "rotate-0 transition-all duration-300"}
                        />
                    </button>

                    <span className={`${roboto_400.className} text-base text-white font-medium`}>SEASON {season.serial_number}</span>
                </div>
            </div>

            <div className={`px-10 -mt-2 relative -z-[10] space-y-6 transition-all duration-300 ${!showSelect ? 'translate-y-0 mb-5' : '-translate-y-[500px]'}`}>

                {/* Episodes array */}
                {[...sortedEpisodes, emptyEpisode].map((episode, index) => {
                    if (episode === null) return
                    return <EpisodeComponent
                        key={index}
                        episode={episode}
                        seasonId={season._id}
                        handleFunc={handleFunc}
                    />
                })}
            </div>
        </div>
    )
}

export default SeasonComponent