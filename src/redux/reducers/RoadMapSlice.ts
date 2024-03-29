import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { changeItems, getItemInfo, getItems, makeItem, removeFile, removeItem } from '../actions/RoadMapAPI';

export interface RoadMapState {
  orderEdit: boolean;
  roadLen: number;
  activity: number;
  isModal: boolean;
  isActivityTypeModal: boolean;
  isCertificate: boolean;
  isClub: boolean;
  isContest: boolean;
  isExternalActivity: boolean;
  isStudy: boolean;
  isEtc: boolean;
  isFile: boolean;
  reLender: boolean;
  isEditMode: boolean;

  // 활동에 입력한 정보들
  nowType: string;
  nowTypeKr: string;
  title: string;
  projectName: string;
  institution: string;
  each: string;
  period: string;
  date: string;

  // get한 정보
  items: Array<{ itemIdx: number; title: string; sequence: number; category: string }>;
  itemInfo: {
    subtitle: string;
    acquisition: string;
    category: string;
    content: string;
    field: string;
    files: Array<{
      fileIdx: number;
      fileUrl: string;
      fileType: string;
    }>;
    institution: string;
    period: string;
    realization: string;
    role: string;
    title: string;
  } | null;
  nowItemIdx: number;
  nowFile: Array<number>;

  removeFiles: Array<number>;
  addImages: Array<File>;
  removeImages: Array<number>;
}

const initialState: RoadMapState = {
  orderEdit: false,
  roadLen: 0,
  activity: 9,
  isModal: false,
  isActivityTypeModal: false,
  isCertificate: false,
  isClub: false,
  isContest: false,
  isExternalActivity: false,
  isStudy: false,
  isEtc: true,
  isFile: false,
  reLender: false,
  isEditMode: false,

  nowType: 'etc',
  nowTypeKr: '기타',
  title: '',
  projectName: '',
  institution: '',
  each: '',
  period: '',
  date: '',

  items: [],
  itemInfo: null,
  nowItemIdx: -1,
  nowFile: [],

  removeFiles: [],
  addImages: [],
  removeImages: [],
};

export const roadMapSlice = createSlice({
  name: 'roadMap',
  initialState,
  reducers: {
    toggleOrderEdit: (state) => {
      state.orderEdit = !state.orderEdit;
    },
    toggleIsModal: (state) => {
      state.isModal = !state.isModal;
      if (!state.isModal) {
        state.isActivityTypeModal = false;
      }
    },
    toggleIsActivityTypeModal: (state) => {
      state.isActivityTypeModal = !state.isActivityTypeModal;
    },
    closeIsActivityTypeModal: (state) => {
      state.isActivityTypeModal = false;
    },
    clickCertificate: (state) => {
      state.isCertificate = true;
      state.nowType = 'certificate';
      state.nowTypeKr = '자격증';
    },
    clickClub: (state) => {
      state.isClub = true;
      state.nowType = 'club';
      state.nowTypeKr = '동아리';
    },
    clickContest: (state) => {
      state.isContest = true;
      state.nowType = 'contest';
      state.nowTypeKr = '공모전';
    },
    clickActivity: (state) => {
      state.isExternalActivity = true;
      state.nowType = 'external-activity';
      state.nowTypeKr = '대외활동';
    },
    clickStudy: (state) => {
      state.isStudy = true;
      state.nowType = 'study';
      state.nowTypeKr = '스터디';
    },
    clickEtc: (state) => {
      state.isEtc = true;
      state.nowType = 'etc';
      state.nowTypeKr = '기타';
    },
    onCloseAllType: (state) => {
      state.isCertificate =
        state.isClub =
        state.isContest =
        state.isExternalActivity =
        state.isStudy =
        state.isEtc =
          false;
    },
    onChangeIsFile: (state, action) => {
      state.isFile = action.payload;
    },
    editMode: (state) => {
      state.isEditMode = true;
    },
    readMode: (state) => {
      state.isEditMode = false;
    },

    //  carrer
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
    changeProjectName: (state, action) => {
      state.projectName = action.payload;
    },
    changeInstitution: (state, action) => {
      state.institution = action.payload;
    },
    changeEach: (state, action) => {
      state.each = action.payload;
    },
    changeDate: (state, action) => {
      state.date = action.payload;
    },
    changePeriod: (state, action) => {
      state.period = action.payload;
    },
    initData: (state) => {
      state.nowType = 'etc';
      state.nowTypeKr = '기타';
      state.title = '';
      state.projectName = '';
      state.institution = '';
      state.each = '';
      state.period = '';
      state.date = '';

      state.itemInfo = null;
    },
    addRemoveFile: (state, action) => {
      state.removeFiles.push(action.payload);
    },
    initRemoveFile: (state) => {
      state.removeFiles = [];
    },
    addImagesPush: (state, action) => {
      state.addImages.push(action.payload);
    },
    initAddImages: (state) => {
      state.addImages = [];
    },
    removeImagesPush: (state, action) => {
      state.removeImages.push(action.payload);
    },
    initRemoveImages: (state) => {
      state.removeImages = [];
    },
  },
  extraReducers: (builder) =>
    builder
      //makeItem or modifyItem
      .addCase(makeItem.pending, () => {
        true;
      })
      .addCase(makeItem.fulfilled, (state) => {
        if (!state.itemInfo) {
          state.isModal = false;
          state.reLender = !state.reLender;
        }
      })
      .addCase(makeItem.rejected, () => {
        alert('실패');
      })
      // get itemlist
      .addCase(getItems.pending, () => {
        true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.roadLen = state.items.length + 1 <= 9 ? 0 : Math.ceil((state.items.length - 8) / 3);
        state.activity = 9 + state.roadLen * 3;

        // console.log(state.items);
      })
      .addCase(getItems.rejected, () => {
        true;
      })
      // change items
      .addCase(changeItems.pending, () => {
        true;
      })
      .addCase(changeItems.fulfilled, (state) => {
        state.reLender = !state.reLender;
      })
      .addCase(changeItems.rejected, () => {
        true;
      })
      // get item info
      .addCase(getItemInfo.pending, () => {
        true;
      })
      .addCase(getItemInfo.fulfilled, (state, action) => {
        if (action.payload) {
          state.itemInfo = action.payload[0];
          // console.log(action.payload[0]);

          state.nowItemIdx = action.payload[1];
          state.nowFile = action.payload[2];
        }
      })
      .addCase(getItemInfo.rejected, () => {
        true;
      })
      // remove item
      .addCase(removeItem.pending, () => {
        true;
      })
      .addCase(removeItem.fulfilled, (state) => {
        state.isModal = false;
        state.reLender = !state.reLender;
      })
      .addCase(removeItem.rejected, () => {
        true;
      })
      // remove file
      .addCase(removeFile.pending, () => {
        true;
      })
      .addCase(removeFile.fulfilled, () => {
        true;
      })
      .addCase(removeFile.rejected, () => {
        true;
      }),
});

export const {
  toggleOrderEdit,
  toggleIsModal,
  toggleIsActivityTypeModal,
  closeIsActivityTypeModal,
  clickCertificate,
  clickClub,
  clickContest,
  clickActivity,
  clickStudy,
  clickEtc,
  onCloseAllType,
  onChangeIsFile,
  changeTitle,
  changeProjectName,
  changeInstitution,
  changeEach,
  changeDate,
  changePeriod,
  editMode,
  readMode,
  initData,
  addRemoveFile,
  initRemoveFile,
  addImagesPush,
  initAddImages,
  removeImagesPush,
  initRemoveImages,
} = roadMapSlice.actions;
export const roadMap = (state: RootState) => state.roadMap;

export default roadMapSlice.reducer;
