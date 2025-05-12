function getAllLocalStorage() {
  const storage = {};
  // 遍历所有存储的键
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    storage[key] = localStorage.getItem(key);
  }
  return storage;
}
// getAllLocalStorage

function setBulkLocalStorage(storageData) {
  if (!storageData || typeof storageData !== 'object') {
    return { 
      total: 0, 
      success: 0, 
      errors: [{ 
        key: 'N/A', 
        error: 'Invalid parameter: Expected object type' 
      }] 
    };
  }

  const results = {
    total: Object.keys(storageData).length,
    success: 0,
    errors: []
  };

  // 遍历对象属性
  Object.entries(storageData).forEach(([key, value]) => {
    try {
      // 保持与单个设置方法一致的类型处理逻辑
      const storageValue = typeof value === 'object' && value !== null
        ? JSON.stringify(value)
        : value;

      localStorage.setItem(key, storageValue);
      results.success++;
    } catch (e) {
      // 记录详细错误信息
      const errorInfo = {
        key: key,
        error: `${e.name}: ${e.message}`
      };
      results.errors.push(errorInfo);
    }
  });

  return results;
}
//setBulkLocalStorage()
