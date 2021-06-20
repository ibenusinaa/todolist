import React from 'react'

const Footer = () => {
    return(
        <div style={{backgroundColor: '#695cff'}}>
            <div className='container'>
                <div className='container d-flex align-items-start'>
                    <div className='col-3 my-5 ml-n4'>
                        <div className = 'funniture-font-bold funniture-font-size-24 mb-3'>
                            To-Do-List
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            Tentang kami
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            To-Do-Lists
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            Promo To-Do-Lists
                        </div >
                        <div className = 'funniture-font-size-16 mb-1'>
                            Blog
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            Filosofi To-Do-Lists
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            Karir
                        </div>
                    </div>
                    <div className='col-3 mt-5'>
                        <div className = 'funniture-font-bold funniture-font-size-20 mb-3 mt-1'>
                            Layanan Pelanggan
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            FAQ
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            Kebijakan Privasi
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            Syarat dan Ketentuan
                        </div >
                        <div className = 'funniture-font-size-16 mb-1'>
                            Kebijakan Pengiriman
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            Kebijakan Pengembalian
                        </div>
                        <div className = 'funniture-font-size-16 mb-3'>
                            Lokasi Kota Pengiriman
                        </div>
                    </div>
                    <div className='col-3 mt-5'>
                        <div className = 'funniture-font-bold funniture-font-size-20 mb-3 mt-2'>
                            Kontak Kami
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            +6282260333593
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            (021)50820022
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            hello@To-Do-Lists.com
                        </div >
                        <div className = 'funniture-font-size-16 mb-1'>
                            Senin - Minggu / 10.00 - 20.00
                        </div>
                        <div className = 'funniture-font-size-16 mb-1'>
                            (Termasuk Hari Libur)
                        </div>
                    </div>
                    <div className='col-3 mt-5'>
                        <div className = 'funniture-font-bold funniture-font-size-16 mb-3 mt-2'>
                            Daftar &amp; Dapatkan Voucher Diskon Rp50.000
                        </div>
                        <div className='input-group'>
                            <input type="email" className="form-control" placeholder="Alamat Email" />
                            <div className='input-group-append ml-2'>
                                <input type="button" value="Daftar" className="btn btn-warning" />
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Footer