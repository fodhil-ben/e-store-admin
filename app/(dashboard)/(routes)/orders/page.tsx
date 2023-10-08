import { Input } from '@/components/ui/Input'
import MainElement from '@/components/ui/MainElement'
import MainTitle from '@/components/ui/MainTitle'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const orders = [
        { product: 'iphone17', phone: '0797530466', address: 'chlef/chorfa', totalPrice: '100.000 Dz', Paid: false },
        { product: 'iphone17', phone: '0797530466', address: 'chlef/chorfa', totalPrice: '100.000 Dz', Paid: false },
    ]
    return (
        <MainElement >
            <MainTitle title={`Orders ${orders?.length}`} />
            <div className='mb-10 flex flex-col lg:flex-row gap-5 justify-between'>
                <Input placeholder='Search...' className='w-full lg:w-fit' />
            </div>
            <div className='overflow-hidden  border-2 rounded-md '>
                <Table className=' '>
                    <TableHeader>
                        <TableRow>
                            {Object.keys(orders[0]).map((e, i) => {
                                return (
                                    <TableHead key={i}>{e}</TableHead>
                                )
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((e, i) => {
                            return <TableRow key={i}>

                                <TableCell >{e.product}</TableCell>
                                <TableCell >{e.phone}</TableCell>
                                <TableCell >{e.address}</TableCell>
                                <TableCell >{e.totalPrice}</TableCell>
                                <TableCell >{e.Paid ? 'Paid' : 'Pending'}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </div>
        </MainElement>
    )
}

export default page