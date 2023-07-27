type typography = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6';

export interface PlayceTheme {
  palette: {
    main: {
      primary: string;
      primaryHover: string;
      primarySelected: string;
      secondary: string;
      secondaryHover: string;
      third: string;
    };
    sub: {
      primary: {
        primary: string;
        primary80: string;
        primary60: string;
        primary40: string;
        primary30: string;
        primary20: string;
        primary10: string;
      };
      navy: {
        navy: string;
        navy80: string;
        navy60: string;
        navy40: string;
        navy30: string;
        navy20: string;
        navy10: string;
      };
      green: {
        green: string;
        green80: string;
        green60: string;
        green40: string;
        green30: string;
        green20: string;
        green10: string;
      };
      purple: {
        purple: string;
        purple80: string;
        purple60: string;
        purple40: string;
        purple30: string;
        purple20: string;
        purple10: string;
      };
    };
    content: {
      success: {
        success: string;
        success50: string;
        success10: string;
      };
      disabled: {
        disabled: string;
        disabled50: string;
      };
      positive: {
        positive: string;
        positive50: string;
        positive10: string;
      };
      negative: {
        negative: string;
        negative50: string;
        negative10: string;
      };
      warning: {
        warning: string;
        warning50: string;
        warning10: string;
      };
    };
    icon: {
      grey100: string;
      grey70: string;
      disabled: string;
      primary: string;
      white: string;
    };
    surface: {
      background: string;
      positive: string;
      negative: string;
      warning: string;
    };
    greyScale: {
      grey100: string;
      grey70: string;
      grey50: string;
      grey40: string;
      grey30: string;
      grey20: string;
      grey10: string;
      grey5: string;
    };
    text: {
      primary: string;
      dark: string;
      grey100: string;
      grey70: string;
      disabled: string;
      white: string;
    };
    line: {
      primary: string;
      grey100: string;
      grey30: string;
      grey20: string;
      grey10: string;
    };
    lnb: {
      main: string;
      sub: string;
      hover: string;
      selected: string;
      iconText: string;
    };
    aLink: {
      link: string;
    };
  };
  typo: {
    [key in typography]: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
    };
  };
}

export const defaultTheme: PlayceTheme = {
  palette: {
    main: {
      primary: '#1C74DF',
      primaryHover: '#0051B4',
      primarySelected: '#E2F3FF',
      secondary: '#CADFFE',
      secondaryHover: '#A5C7F9',
      third: '#F2EBFF',
    },
    sub: {
      primary: {
        primary: '',
        primary80: '',
        primary60: '',
        primary40: '',
        primary30: '',
        primary20: '',
        primary10: '',
      },
      navy: {
        navy: '',
        navy80: '',
        navy60: '',
        navy40: '',
        navy30: '',
        navy20: '',
        navy10: '',
      },
      green: {
        green: '',
        green80: '',
        green60: '',
        green40: '',
        green30: '',
        green20: '',
        green10: '',
      },
      purple: {
        purple: '',
        purple80: '',
        purple60: '',
        purple40: '',
        purple30: '',
        purple20: '',
        purple10: '',
      },
    },
    content: {
      success: {
        success: '#1F94FA',
        success50: '#DDEFFE',
        success10: '#EBF6FF',
      },
      disabled: {
        disabled: '#DFE2E8',
        disabled50: '#C7D1E5',
      },
      positive: {
        positive: '#2DA02B',
        positive50: '#A8F1A6',
        positive10: '#E4F6E4',
      },
      negative: {
        negative: '#DA3D3D',
        negative50: '#BA3535',
        negative10: '#FFEAE7',
      },
      warning: {
        warning: '#F59638',
        warning50: '#FEF5D1',
        warning10: '#FDEAD7',
      },
    },
    icon: {
      grey100: '#50545B',
      grey70: '#808591',
      disabled: '#B5B8BF',
      primary: '#1C74DF',
      white: '#FFFFFF',
    },
    surface: {
      background: '#F3F5F8',
      positive: '#FBFEFC',
      negative: '#FFFAFA',
      warning: '#FFFCFA',
    },
    greyScale: {
      grey100: '#50545B',
      grey70: '#808591',
      grey50: '#9BA1AB',
      grey40: '#ACB2BD',
      grey30: '#D3D6DB',
      grey20: '#E6E8EC',
      grey10: '#F0F2F4',
      grey5: '#F8F9FB',
    },
    text: {
      primary: '#1C74DF',
      dark: '#323232',
      grey100: '#50545B',
      grey70: '#808591',
      disabled: '#B5B8BF',
      white: '#fff',
    },
    line: {
      primary: '#1C74DF',
      grey100: '#50545B',
      grey30: '#D6D9DE',
      grey20: '#E6E8EC',
      grey10: '#F0F2F4',
    },
    lnb: {
      main: '#0A2545',
      sub: '#061527',
      hover: '#223B59',
      selected: '#1C74DF',
      iconText: '#CADFFE',
    },
    aLink: {
      link: '#1F94FA',
    },
  },
  typo: {
    h1: {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '42px',
    },
    h2: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '34px',
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '30px',
    },
    h4: {
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '28px',
    },
    h5: {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: '20px',
    },
    p1: {
      fontSize: '15px',
      fontWeight: 500,
      lineHeight: '24px',
    },
    p2: {
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    p3: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: '20px',
    },
    p4: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    p5: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '20px',
    },
    p6: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '20px',
    },
  },
};
