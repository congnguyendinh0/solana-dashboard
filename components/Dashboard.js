import { useEffect, useState } from "react"
import { useMoralisSolanaApi } from "react-moralis"


export default function Dashboard( {logout,user}) {
    let walletAdress = user.get('solAddress')
    let SolanaAPI = useMoralisSolanaApi()
    let [solanaBalance,setBalance] = useState('')
    let [splBalance,setSplBalance] = useState([{   }])
    let [nftsBalance,setNfts] = useState([{   }])

    useEffect(()=>{
        const fetchData = async() => {
            try {
                let result = await SolanaAPI.account.balance({
                    network: 'devnet',
                    address: walletAdress
                })
              setBalance(result.solana)
            } catch (error) {
                console.log(error)
            }

            try {
                let result = await SolanaAPI.account.getSPL({
                    network: 'devnet',
                    address: walletAdress
                }
            
                )
                setSplBalance(result)
            } catch (error) {
                
            }
  try {
                let result = await SolanaAPI.account.getNFTs({
                    network: 'devnet',
                    address: walletAdress
                }
            
                )
                setNFTs(result)
            } catch (error) {
                
            }
        }
        fetchData()

    },[])
    return(
        <div className="w-screen h-screen flex flex-col items-center justify-center py-10 px-4 bg-black overflow-auto">
            <button onClick={logout}className="text-white self-end">logout</button>
            <p className="text-white font-bold text-xl md:text-3xl">Adress: {walletAdress}</p>
            <p className="text-white mt-2 mb-8 text-[0.6rem] md:text-lg"></p>
            <div className="w-full h-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="bg-pink rounded-2xl drop-shadow-md px-2 py-2 md:px-4 md:py-4 md:text-lg">
                    <p className="text-2xl md:text-4xl">solana balance</p>
                    <p className="mt-4 md:mt-10 text-3xl md:text-6xl">{solanaBalance} <span>SOL</span></p>
                </div>
                <div className="bg-green rounded-2xl drop-shadow-md px-2 py-2 md:px-4 md:py-4 md:text-lg">
                    <p className="text-2xl md:text-4xl">spl tokens {splBalance.length} </p>
                    <ul className="list-disc ml-8 mt-4 md:mt-10 text-md md:text-lg break-all">
                      {splBalance.length > 0 && splBalance.map((splBalance, i) =>(
                      <li key={i}>
{splBalance.mint} 
<details>
    <p>Amount: {splBalance.amount}</p>
    <p>Decimals: {splBalance.decimals}</p>
      </details>

                      </li>))}
                    </ul>
                </div>
                <div className="bg-cyan md:col-span-2 rounded-2xl drop-shadow-md px-2 py-2 md:px-4 md:py-4 md:text-lg">
                    <p className="text-2xl md:text-4xl">nfts 1</p>
                    <ul className="list-disc px-4 mt-4 md:mt-10 text-md md:text-lg">
                    {nftsBalance.length > 0 && nftsBalance.map((nfts,i)=>(<li key={i} >{nfts.mint}</li>))}
                    </ul>
                </div>
            </div>
        </div>
    )
}