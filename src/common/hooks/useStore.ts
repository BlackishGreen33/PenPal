interface State {
  addMessage: string | null;
  isLoading: boolean;
  message: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// const useStore = create<State>((set) => ({
//   // addMessage: null;
//   // isLoading: false;
//   // message: string;
//   // handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   // screenSize: undefined,
//   // setScreenSize: (size) => set({ screenSize: size }),
// }));

// export default useStore;
