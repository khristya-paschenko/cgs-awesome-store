import {DateSorting, DeliveryStatus, PaymentStatus} from "~/modules/services/orders";
import React, {createContext, RefObject} from "react";
import BottomSheet from "@gorhom/bottom-sheet";

export type BottomSheetOption = 'payment' | 'delivery' | 'date';

export interface BottomSheetContext {
    drawerContext?: BottomSheetOption;
    showDrawer?: (content: BottomSheetOption) => void;

    paymentFilter?: PaymentStatus;
    setPaymentFilter?: (content: PaymentStatus) => void;

    deliveryFilter?: DeliveryStatus;
    setDeliveryFilter?: (content: DeliveryStatus) => void;

    dateSorting?: DateSorting;
    setDateSorting?: (content: DateSorting) => void;

    page?: number;
    setPage?: (page: number) => void;
}

export const BottomSheetContext = createContext<BottomSheetContext>({});

export const useBottomSheet = (bottomSheetRef: RefObject<BottomSheet>):BottomSheetContext => {
    const [drawerContent, setDrawerContent] = React.useState<BottomSheetOption>('payment');

    const showDrawer = (content: BottomSheetOption) => {
        setDrawerContent(content);
        bottomSheetRef.current?.expand();
    }

    const [paymentFilter, setPaymentFilter] = React.useState<PaymentStatus>();
    const [deliveryFilter, setDeliveryFilter] = React.useState<DeliveryStatus>();
    const [dateSorting, setDateSorting] = React.useState<DateSorting>();
    const [page, setPage] = React.useState<number>(1);

    return {
        drawerContent,
        showDrawer,

        paymentFilter,
        setPaymentFilter,

        deliveryFilter,
        setDeliveryFilter,

        dateSorting,
        setDateSorting,

        page,
        setPage,
    };
}
