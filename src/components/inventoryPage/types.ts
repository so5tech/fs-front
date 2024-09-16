export type PipelineWithHoverProps = {
    data: { currentStage: number, item_name: string, data: { name: string; value: number; date: string }[] };
};

export type PipelineProps = {
    onHover: (hovered: boolean) => void; // Callback to handle hover state
    data: any;
};

export interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    created_on: string;
    role: string;
    is_delete: boolean;
    token: string;
    // Add other user properties as needed
}

export interface DataField {
    name: string;
    value: number;
    date: string;
}

export interface ItemData {
    currentStage: number;
    item_name: string;
    discription: string;
    image_link: string;
    data: DataField[];
    current_stock: number;
}


// export interface User {
//     id: number;
//     name: string;
//     email: string;
//     address: string;
//     created_on: string;
//     role: string;
//     is_delete: boolean;
//     token: string;
//     // Add other user properties as needed
//   }

export type EditDataProps = {
    data: any; // Adjust this type as needed
    onSave: (updatedData: any) => void;
};

export type BarChartProps = {
    data: { name: string; value: number; date: string }[];
    stageColor: string; // Color to apply to the bars
};