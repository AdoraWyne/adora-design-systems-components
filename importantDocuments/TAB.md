_[Claude chat](https://claude.ai/chat/3573520a-821a-4214-9af6-fbfa00eaacf7)_

# Components

3 components:

- **TabList**
  - <div>
  - Attributes:
    - `role="tablist"`
  - Props:
    - children

- **Tab**
  - <button> or <a>
  - Attributes:
    - aria-controls={`panel-${value}`}
    - aria-selected="true" or "false" or when activeTab === value
    - id={`tab-${value}`}
    - onClick={onTabClick}
    - role="tab"
    - tabIndex={isSelected ? 0 : -1}
    - type="button"
    - className="aria-selected:..."
  - Props:
    - children
    - value
    - isSelected
    - onTabClick

- **TabPanel**
  - <div>
  - Attributes:
    - aria-labelledby={tab-${value}}
    - id={`panel-${value}`}
    - role="tabpanel"
    - hidden={activeTab !== value}
  - Props:
    - children
    - value
    - activeTab

# Accessibility

- role="tablist"
- role="tab"
- role="tabpanel"
- aria-selected
- aria-controls
- aria-labelledby

# Improve

- arrow key navigation
- useContext?
