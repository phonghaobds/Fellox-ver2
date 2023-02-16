import { createSlice } from "@reduxjs/toolkit";
import {
  addCard,
  addList,
  addMember,
  changeRole,
  getBoard,
  getBoards,
  getList,
  removeMember,
  moveList,
  moveCard,
  addCardMember,
  editCard,
  renameList,
  renameBoard,
  archiveList,
  archiveCard,
  deleteCard,
} from "../../../services/board/boardAction";

const initialState = {
  boards: [],
  board: null,
  loading: true,
  error: {},
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: {
    [getBoards.pending]: (state) => {
      state.board = null;
    },
    [getBoards.fulfilled]: (state, { payload }) => {
      state.boards = payload;
      state.loading = false;
    },
    [getBoards.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    [getBoard.pending]: (state) => {
      state.board = null;
      state.loading = true;
    },
    [getBoard.fulfilled]: (state, { payload }) => {
      state.board = { ...state.board, ...payload };
      state.loading = false;
    },
    [getBoard.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // addMember
    [addMember.fulfilled]: (state, { payload }) => {
      state.board = { ...state.board, members: payload };
      state.loading = false;
    },
    [addMember.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // removeMember
    [removeMember.fulfilled]: (state, { payload }) => {
      state.board = { ...state.board, members: payload };
      state.loading = false;
    },
    [removeMember.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // changeRole
    [changeRole.fulfilled]: (state, { payload }) => {
      state.board = { ...state.board, members: payload };
      state.loading = false;
    },
    [changeRole.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // addList
    [addList.fulfilled]: (state, { payload }) => {
      state.board = {
        ...state.board,
        lists: payload,
      };
    },
    [addList.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // addCard
    [addCard.fulfilled]: (state, { payload }) => {
      state.board = {
        ...state.board,
        lists: state.board.lists.map((list) =>
          list._id === payload._id ? payload : list
        ),
      };
    },
    [addCard.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    // getList
    [getList.pending]: (state) => {
      state.loading = true;
    },
    [getList.fulfilled]: (state, { payload }) => {
      state.board = {
        ...state.board,
        lists: state.board.lists.map((list) =>
          list._id === payload._id ? payload : list
        ),
      };
      state.loading = false;
    },
    [getList.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // moveList
    [moveList.fulfilled]: (state, { payload }) => {
      state.board = { ...state.board, lists: payload };
    },
    [moveList.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // moveCard
    [moveCard.fulfilled]: (state, { payload }) => {
      const { fromList, toList } = payload;
      state.board = {
        ...state.board,
        lists: state.board.lists.map((list) => {
          return list._id === fromList._id
            ? fromList
            : list._id === toList._id
            ? toList
            : list;
        }),
      };
    },
    [moveCard.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // addCardMember
    [addCardMember.pending]: (state) => {
      state.loading = true;
    },
    [addCardMember.fulfilled]: (state, { payload }) => {
      const updatedLists = state.board.lists.map((list) => {
        const newCards = list.cards.map((card) =>
          card._id === payload._id ? payload : card
        );
        return {
          ...list,
          cards: newCards,
        };
      });

      state.board = {
        ...state.board,
        lists: updatedLists,
      };
      state.loading = false;
    },
    [addCardMember.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // editCard
    [editCard.pending]: (state) => {
      state.loading = true;
    },
    [editCard.fulfilled]: (state, { payload }) => {
      const updatedLists = state.board.lists.map((list) => {
        const newCards = list.cards.map((card) =>
          card._id === payload._id ? payload : card
        );
        return {
          ...list,
          cards: newCards,
        };
      });

      state.board = {
        ...state.board,
        lists: updatedLists,
      };
      state.loading = false;
    },
    [editCard.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // renameList
    [renameList.pending]: (state) => {
      state.loading = true;
    },
    [renameList.fulfilled]: (state, { payload }) => {
      state.board = {
        ...state.board,
        lists: state.board.lists.map((list) =>
          list._id === payload._id ? payload : list
        ),
      };
      state.loading = false;
    },
    [renameList.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // renameBoard
    [renameBoard.pending]: (state) => {
      state.loading = true;
    },
    [renameBoard.fulfilled]: (state, { payload }) => {
      state.board = payload;
      state.loading = false;
    },
    [renameBoard.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // archiveList
    [archiveList.pending]: (state) => {
      state.loading = true;
    },
    [archiveList.fulfilled]: (state, { payload }) => {
      state.board = {
        ...state.board,
        lists: state.board.lists.map((list) =>
          list._id === payload._id ? payload : list
        ),
      };
      state.loading = false;
    },
    [archiveList.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // archiveCard
    [archiveCard.pending]: (state) => {
      state.loading = true;
    },
    [archiveCard.fulfilled]: (state, { payload }) => {
      const updatedLists = state.board.lists.map((list) => {
        const newCards = list.cards.map((card) =>
          card._id === payload._id ? payload : card
        );
        return {
          ...list,
          cards: newCards,
        };
      });
      state.board = {
        ...state.board,
        lists: updatedLists,
      };
      state.loading = false;
    },
    [archiveCard.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // deleteCard
    [deleteCard.pending]: (state) => {
      state.loading = true;
    },
    [deleteCard.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.board = {
        ...state.board,
        lists: state.board.lists.map((list) => {
          return {
            ...list,
            cards: list.cards.filter((card) => card._id !== payload),
          };
        }),
      };
    },

    [deleteCard.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default boardSlice.reducer;
